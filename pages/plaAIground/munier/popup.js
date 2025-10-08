// Popup script for IS MU Offline Curriculum extension

(async function() {
  'use strict';

  const downloadBtn = document.getElementById('download-btn');
  const statusDiv = document.getElementById('status');
  const notDetectedDiv = document.getElementById('not-detected');
  const processingDiv = document.getElementById('processing');
  const errorDiv = document.getElementById('error');
  const successDiv = document.getElementById('success');
  const progressDetails = document.getElementById('progress-details');
  const errorText = document.getElementById('error-text');

  // Check if we're on a curriculum page
  async function checkCurriculumPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.url.includes('is.muni.cz') || !tab.url.includes('index.qwarp')) {
        showNotDetected();
        return false;
      }
      
      return true;
    } catch (error) {
      showError('Failed to check page: ' + error.message);
      return false;
    }
  }

  // Show different states
  function showStatus() {
    statusDiv.style.display = 'block';
    notDetectedDiv.style.display = 'none';
    processingDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    downloadBtn.disabled = false;
  }

  function showNotDetected() {
    statusDiv.style.display = 'none';
    notDetectedDiv.style.display = 'block';
    processingDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    downloadBtn.disabled = true;
  }

  function showProcessing(message = '') {
    statusDiv.style.display = 'none';
    notDetectedDiv.style.display = 'none';
    processingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    downloadBtn.disabled = true;
    if (message) {
      progressDetails.textContent = message;
    }
  }

  function showError(message) {
    statusDiv.style.display = 'none';
    notDetectedDiv.style.display = 'none';
    processingDiv.style.display = 'none';
    errorDiv.style.display = 'block';
    successDiv.style.display = 'none';
    downloadBtn.disabled = false;
    errorText.textContent = message;
  }

  function showSuccess() {
    statusDiv.style.display = 'none';
    notDetectedDiv.style.display = 'none';
    processingDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    successDiv.style.display = 'block';
    downloadBtn.disabled = false;
  }

  // Sanitize filename
  function sanitizeFilename(filename) {
    return filename
      .replace(/[^a-zA-Z0-9_\-\s]/g, '_')
      .replace(/\s+/g, '_')
      .substring(0, 100);
  }

  // Handle filename collisions
  function getUniqueFilename(filename, existingNames) {
    if (!existingNames.has(filename)) {
      existingNames.add(filename);
      return filename;
    }

    const parts = filename.split('.');
    const extension = parts.length > 1 ? parts.pop() : '';
    const baseName = parts.join('.');
    
    let counter = 1;
    let newFilename;
    
    do {
      newFilename = extension 
        ? `${baseName}_(${counter}).${extension}`
        : `${baseName}_(${counter})`;
      counter++;
    } while (existingNames.has(newFilename));
    
    existingNames.add(newFilename);
    return newFilename;
  }

  // Download a resource
  async function downloadResource(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.warn(`Failed to download ${url}:`, error);
      return null;
    }
  }

  // Download HTML page content
  async function downloadHtmlPage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const html = await response.text();
      return html;
    } catch (error) {
      console.warn(`Failed to download HTML ${url}:`, error);
      return null;
    }
  }

  // Download IS MU stylesheets
  async function downloadStylesheets(styleUrls) {
    let combinedCss = '';
    
    for (const url of styleUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const css = await response.text();
          combinedCss += `\n/* From: ${url} */\n${css}\n`;
        }
      } catch (error) {
        console.warn(`Failed to download stylesheet ${url}:`, error);
      }
    }
    
    return combinedCss;
  }

  // Get file extension from URL or type
  function getFileExtension(url, resourceType) {
    // Try to get from URL first
    try {
      const urlPath = new URL(url).pathname;
      const match = urlPath.match(/\.([a-z0-9]+)$/i);
      if (match) {
        return match[1].toLowerCase();
      }
    } catch (e) {
      // Invalid URL
    }

    // Fallback to resource type
    const typeMap = {
      'html_page': 'html',
      'pdf': 'pdf',
      'document': 'docx',
      'spreadsheet': 'xlsx',
      'presentation': 'pptx',
      'page': 'html'
    };
    return typeMap[resourceType] || 'html';
  }

  // Main download function
  async function downloadCurriculum() {
    try {
      showProcessing('Extracting curriculum data...');

      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Extract curriculum data from the page
      const response = await chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_CURRICULUM' });

      if (!response.success) {
        throw new Error(response.error || 'Failed to extract curriculum data');
      }

      const { data } = response;
      console.log('Extracted data:', data);

      showProcessing('Downloading IS MU stylesheets...');
      
      // Download IS MU CSS
      const muCss = await downloadStylesheets(data.styles);

      showProcessing(`Downloading linked pages (0/${data.linkedPages.length})...`);

      // Create a ZIP file
      const zip = new JSZip();
      const resourcesFolder = zip.folder('resources');
      const usedFilenames = new Set();

      // Download all linked pages and documents
      let downloadedCount = 0;
      const linkedPagesIndex = [];

      for (const linkedPage of data.linkedPages) {
        showProcessing(`Downloading resources (${downloadedCount}/${data.linkedPages.length})...`);

        let content = null;
        let filename = '';

        if (linkedPage.type === 'html_page') {
          // Download HTML content
          content = await downloadHtmlPage(linkedPage.url);
          if (content) {
            // Wrap in basic HTML structure with IS MU styling
            content = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>${linkedPage.originalName}</title>
  <style>${muCss}</style>
</head>
<body>
${content}
</body>
</html>`;
            filename = linkedPage.sanitizedName + '.html';
          }
        } else {
          // Download binary files (PDFs, documents, etc.)
          const blob = await downloadResource(linkedPage.url);
          if (blob) {
            content = blob;
            const extension = getFileExtension(linkedPage.url, linkedPage.type);
            filename = linkedPage.sanitizedName + '.' + extension;
          }
        }

        if (content && filename) {
          const uniqueFilename = getUniqueFilename(filename, usedFilenames);
          resourcesFolder.file(uniqueFilename, content);
          
          linkedPagesIndex.push({
            title: linkedPage.originalName,
            filename: uniqueFilename,
            type: linkedPage.type
          });
          
          downloadedCount++;
        }
      }

      showProcessing('Generating PDF...');

      // Create an index of linked resources
      let resourceIndex = '<h2>📚 Linked Resources</h2><ul>';
      for (const item of linkedPagesIndex) {
        resourceIndex += `<li><strong>${item.title}</strong> → <code>resources/${item.filename}</code></li>`;
      }
      resourceIndex += '</ul>';

      // Create PDF from content with IS MU styling
      const pdfContent = `
        <!DOCTYPE html>
        <html lang="cs">
        <head>
          <meta charset="UTF-8">
          <title>${data.title}</title>
          <style>
            ${muCss}
            
            /* Additional print-friendly styles */
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              color: #333;
            }
            
            h1, h2, h3 { 
              color: #2c3e50; 
              page-break-after: avoid;
            }
            
            .resource-note {
              background: #e8f4f8;
              padding: 15px;
              margin: 20px 0;
              border-left: 4px solid #3498db;
              page-break-inside: avoid;
            }
            
            code {
              background: #f1f3f5;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: 'Courier New', monospace;
            }
            
            ul {
              padding-left: 20px;
            }
            
            li {
              margin: 8px 0;
            }
          </style>
        </head>
        <body>
          <h1>${data.title}</h1>
          ${data.content}
          
          <div class="resource-note">
            ${resourceIndex}
            <p><strong>Note:</strong> All linked pages and documents have been downloaded to the <code>resources/</code> folder for offline access.</p>
          </div>
        </body>
        </html>
      `;

      // Generate PDF
      const pdfElement = document.createElement('div');
      pdfElement.innerHTML = pdfContent;

      const opt = {
        margin: 10,
        filename: sanitizeFilename(data.title) + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      const pdfBlob = await html2pdf().set(opt).from(pdfElement).outputPdf('blob');

      // Add PDF to ZIP
      zip.file(sanitizeFilename(data.title) + '.pdf', pdfBlob);

      showProcessing('Creating ZIP archive...');

      // Generate ZIP file
      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });

      // Download the ZIP
      const zipFilename = sanitizeFilename(data.title) + '_offline.zip';
      const url = URL.createObjectURL(zipBlob);

      await chrome.downloads.download({
        url: url,
        filename: zipFilename,
        saveAs: true
      });

      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      showSuccess();
      
    } catch (error) {
      console.error('Download error:', error);
      showError(error.message || 'An unknown error occurred');
    }
  }

  // Event listeners
  downloadBtn.addEventListener('click', downloadCurriculum);

  // Initialize
  const isCurriculum = await checkCurriculumPage();
  if (isCurriculum) {
    showStatus();
  }

})();
