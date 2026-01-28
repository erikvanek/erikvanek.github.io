// Background service worker - orchestrates downloads and creates zip file

// Import JSZip using importScripts (allowed in service workers)
importScripts('lib/jszip.min.js');

// Download a single file and return as blob
async function downloadFile(url) {
  const response = await fetch(url, {
    credentials: 'include',
    mode: 'cors'
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.blob();
}

// Download a file and return as text (for CSS)
async function downloadText(url) {
  const response = await fetch(url, {
    credentials: 'include',
    mode: 'cors'
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.text();
}

// Fetch stylesheets and combine them
async function fetchStylesheets(urls) {
  const styles = [];
  for (const url of urls) {
    try {
      const css = await downloadText(url);
      styles.push(`/* Source: ${url} */\n${css}`);
    } catch (error) {
      console.warn(`Failed to fetch stylesheet ${url}:`, error);
    }
  }
  return styles.join('\n\n');
}

// Generate HTML document with proper styles
async function generateCurriculumHtml(title, htmlContent, inlineStyles, stylesheetUrls) {
  let externalStyles = '';
  if (stylesheetUrls && stylesheetUrls.length > 0) {
    externalStyles = await fetchStylesheets(stylesheetUrls);
  }

  const fullHtml = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    ${externalStyles}
    ${inlineStyles || ''}
    @media print {
      body { background: white !important; }
      .print-hide, .hide-for-print, nav, #left_menu, .sticky_panel { display: none !important; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: white;
    }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  ${htmlContent}
</body>
</html>`;

  return new Blob([fullHtml], { type: 'text/html; charset=utf-8' });
}

// Helper to escape HTML
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate PDF using Chrome DevTools Protocol (print to PDF)
async function generatePdfWithDebugger(tabId) {
  return new Promise(async (resolve, reject) => {
    const debuggerTarget = { tabId: tabId };

    try {
      // Attach debugger
      await chrome.debugger.attach(debuggerTarget, '1.3');
      console.log('Debugger attached');

      // Wait a moment for attachment
      await new Promise(r => setTimeout(r, 500));

      // Print to PDF using Page.printToPDF
      const result = await chrome.debugger.sendCommand(debuggerTarget, 'Page.printToPDF', {
        landscape: false,
        displayHeaderFooter: false,
        printBackground: true,
        scale: 1,
        paperWidth: 8.27,  // A4 width in inches
        paperHeight: 11.69, // A4 height in inches
        marginTop: 0.4,
        marginBottom: 0.4,
        marginLeft: 0.4,
        marginRight: 0.4,
        preferCSSPageSize: false
      });

      // Detach debugger
      await chrome.debugger.detach(debuggerTarget);
      console.log('Debugger detached, PDF size:', result.data.length);

      resolve(result.data); // Returns base64 encoded PDF
    } catch (error) {
      // Try to detach on error
      try {
        await chrome.debugger.detach(debuggerTarget);
      } catch (e) {}
      reject(error);
    }
  });
}

// Main download orchestration
async function processDownload(data, sendProgress) {
  const { title, content, inlineStyles, stylesheetUrls, resources, tabId } = data;
  const totalFiles = resources.length + 2; // +2 for curriculum PDF and HTML
  let currentFile = 0;
  let successful = 0;
  let failed = 0;
  const failedFiles = [];

  try {
    const zip = new JSZip();

    // Step 1: Generate curriculum PDF using browser's print-to-PDF
    sendProgress(currentFile, totalFiles, 'Generating PDF (print to PDF)...');
    try {
      const pdfBase64 = await generatePdfWithDebugger(tabId);
      // Decode base64 to binary
      const binaryString = atob(pdfBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      zip.file('curriculum.pdf', bytes);
      successful++;
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      failed++;
      failedFiles.push({ name: 'curriculum.pdf', error: error.message });
    }
    currentFile++;

    // Step 2: Generate HTML backup with styles
    sendProgress(currentFile, totalFiles, 'Generating HTML backup...');
    try {
      const htmlBlob = await generateCurriculumHtml(title, content, inlineStyles, stylesheetUrls);
      zip.file('curriculum.html', htmlBlob);
      successful++;
    } catch (error) {
      console.error('Failed to generate HTML:', error);
      failed++;
      failedFiles.push({ name: 'curriculum.html', error: error.message });
    }
    currentFile++;

    // Step 3: Download each resource
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

    // Step 4: Generate and download zip
    sendProgress(currentFile, totalFiles, 'Creating zip file...');

    const zipBase64 = await zip.generateAsync({ type: 'base64' });
    const dataUrl = `data:application/zip;base64,${zipBase64}`;
    const filename = `${title}.zip`;

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

    const sendProgress = (current, total, status) => {
      chrome.runtime.sendMessage({
        action: 'progressUpdate',
        current,
        total,
        status
      }).catch(() => {});
    };

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

    return true;
  }
});

console.log('Study Path Downloader: Background worker loaded');
