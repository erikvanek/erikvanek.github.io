// Background service worker - orchestrates downloads and creates zip file

// Import JSZip using importScripts (allowed in service workers)
importScripts('lib/jszip.min.js');

// Download a single file and return as blob
async function downloadFile(url) {
  const response = await fetch(url, {
    credentials: 'include', // Include cookies for auth
    mode: 'cors'
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.blob();
}

// Generate PDF from HTML content
// Note: For MVP, we'll create a simplified HTML-based approach
// Full PDF generation will be added in Step 4
async function generateCurriculumPdf(title, htmlContent) {
  // Create a simplified HTML document
  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    a {
      color: #1976d2;
    }
    ul, ol {
      padding-left: 2em;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    td, th {
      border: 1px solid #ddd;
      padding: 8px;
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${htmlContent}
</body>
</html>`;

  // For now, return HTML as blob - PDF generation will be added in Step 4
  // This allows us to test the full flow before adding html2pdf.js
  return new Blob([fullHtml], { type: 'text/html' });
}

// Main download orchestration
async function processDownload(data, sendProgress) {
  const { title, content, resources, tabId } = data;
  const totalFiles = resources.length + 1; // +1 for curriculum
  let currentFile = 0;
  let successful = 0;
  let failed = 0;
  const failedFiles = [];

  try {
    const zip = new JSZip();

    // Step 1: Generate curriculum PDF/HTML
    sendProgress(currentFile, totalFiles, 'Generating curriculum document...');
    try {
      const curriculumBlob = await generateCurriculumPdf(title, content);
      // For now using .html, will change to .pdf in Step 4
      zip.file('curriculum.html', curriculumBlob);
      successful++;
    } catch (error) {
      console.error('Failed to generate curriculum:', error);
      failed++;
      failedFiles.push({ name: 'curriculum', error: error.message });
    }
    currentFile++;

    // Step 2: Download each resource
    const resourcesFolder = zip.folder('resources');

    for (const resource of resources) {
      sendProgress(currentFile, totalFiles, `Downloading: ${resource.name}`);

      try {
        const blob = await downloadFile(resource.url);
        resourcesFolder.file(resource.name, blob);
        successful++;
      } catch (error) {
        console.error(`Failed to download ${resource.name}:`, error);
        failed++;
        failedFiles.push({ name: resource.name, error: error.message });
      }

      currentFile++;

      // Add delay between downloads to avoid rate limiting
      if (currentFile < totalFiles) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Step 3: Generate and download zip
    sendProgress(currentFile, totalFiles, 'Creating zip file...');

    // Generate zip as base64 data URL (URL.createObjectURL not available in service workers)
    const zipBase64 = await zip.generateAsync({ type: 'base64' });
    const dataUrl = `data:application/zip;base64,${zipBase64}`;
    const filename = `${title}.zip`;

    // Trigger download using data URL
    await chrome.downloads.download({
      url: dataUrl,
      filename: filename,
      saveAs: true
    });

    return {
      successful,
      failed,
      total: totalFiles,
      failedFiles
    };

  } catch (error) {
    console.error('Download process error:', error);
    throw error;
  }
}

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startDownload') {
    const { data } = message;

    // Progress callback
    const sendProgress = (current, total, status) => {
      chrome.runtime.sendMessage({
        action: 'progressUpdate',
        current,
        total,
        status
      }).catch(() => {
        // Popup may be closed, ignore error
      });
    };

    // Start async download process
    processDownload(data, sendProgress)
      .then(result => {
        chrome.runtime.sendMessage({
          action: 'downloadComplete',
          ...result
        }).catch(() => {});
      })
      .catch(error => {
        chrome.runtime.sendMessage({
          action: 'downloadError',
          error: error.message
        }).catch(() => {});
      });

    // Return true to indicate async response
    return true;
  }
});

console.log('Study Path Downloader: Background worker loaded');
