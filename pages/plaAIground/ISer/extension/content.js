// Content script - runs in the context of the curriculum page
// Extracts content and identifies resources from IS MUNI interactive syllabus

(function() {
  // Prevent multiple injections
  if (window.__studyPathDownloaderInjected) return;
  window.__studyPathDownloaderInjected = true;

  // Configuration
  const CONFIG = {
    // Internal university URL patterns
    internalDomains: ['is.muni.cz', 'muni.cz'],
    // File extensions to download
    downloadableExtensions: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.odt', '.odp', '.ods'],
    // Generic link texts to skip when extracting names
    genericLinkTexts: [
      'here', 'download', 'link', 'click', 'attachment', 'file', 'pdf', 'document',
      'stáhnout', 'soubor', 'příloha', 'pdf ke stažení', 'ke stažení'
    ]
  };

  // Utility: Check if URL is internal university resource
  function isInternalUrl(url) {
    try {
      const urlObj = new URL(url, window.location.origin);
      return CONFIG.internalDomains.some(domain => urlObj.hostname.includes(domain));
    } catch {
      return false;
    }
  }

  // Utility: Check if URL points to downloadable file
  function isDownloadableUrl(url) {
    const lowerUrl = url.toLowerCase();
    if (CONFIG.downloadableExtensions.some(ext => lowerUrl.includes(ext))) {
      return true;
    }
    if (lowerUrl.includes('/download/') || lowerUrl.includes('action=download') || lowerUrl.includes('export=')) {
      return true;
    }
    return false;
  }

  // Utility: Check if link text is generic
  function isGenericText(text) {
    if (!text) return true;
    const normalized = text.toLowerCase().trim();
    if (normalized.length < 2) return true;
    return CONFIG.genericLinkTexts.some(generic =>
      normalized === generic || normalized === generic + 's' || normalized.startsWith(generic)
    );
  }

  // Utility: Sanitize filename
  function sanitizeFilename(name) {
    if (!name) return 'unnamed';
    return name
      .replace(/[/\\:*?"<>|]/g, '-')
      .replace(/\s+/g, ' ')
      .replace(/^\.+/, '_')
      .trim()
      .substring(0, 200);
  }

  // Utility: Extract filename from URL
  function getFilenameFromUrl(url) {
    try {
      const urlObj = new URL(url, window.location.origin);
      const pathname = urlObj.pathname;
      const filename = pathname.split('/').pop();
      if (filename && filename.includes('.')) {
        return decodeURIComponent(filename);
      }
    } catch {}
    return null;
  }

  // Utility: Get extension from URL or filename
  function getExtension(url, filename) {
    const urlFilename = getFilenameFromUrl(url);
    if (urlFilename) {
      const match = urlFilename.match(/\.[a-z0-9]+$/i);
      if (match) return match[0].toLowerCase();
    }
    if (filename) {
      const match = filename.match(/\.[a-z0-9]+$/i);
      if (match) return match[0].toLowerCase();
    }
    return '.pdf';
  }

  // IS MUNI specific: Extract name from element title or nearby context
  function extractISMuniResourceName(linkElement) {
    const ioElement = linkElement.closest('.io-element');
    if (ioElement) {
      const titleEl = ioElement.querySelector('.io-element-title');
      if (titleEl) {
        const title = titleEl.textContent?.trim();
        if (title && !isGenericText(title)) return title;
      }
    }

    const parent = linkElement.parentElement;
    if (parent) {
      const prevSibling = parent.previousElementSibling;
      if (prevSibling?.classList?.contains('io-element-title')) {
        const title = prevSibling.textContent?.trim();
        if (title && !isGenericText(title)) return title;
      }
    }

    const section = linkElement.closest('[id^="prvek-obsah"], [id^="io-q-"]');
    if (section) {
      let prev = section.previousElementSibling;
      while (prev) {
        const h1 = prev.querySelector('h1.io-verejne, h1');
        if (h1) {
          const heading = h1.textContent?.trim();
          if (heading && heading.length < 100) return heading;
        }
        prev = prev.previousElementSibling;
      }
    }

    if (linkElement.classList.contains('io-element-title')) {
      const title = linkElement.textContent?.trim();
      if (title && !isGenericText(title)) return title;
    }

    return null;
  }

  // Extract meaningful name for a resource link
  function extractResourceName(linkElement) {
    const ismuniName = extractISMuniResourceName(linkElement);
    if (ismuniName) return ismuniName;

    let linkText = linkElement.textContent?.trim();
    if (linkText && !isGenericText(linkText)) return linkText;

    const img = linkElement.querySelector('img');
    if (img && img.alt && !isGenericText(img.alt)) return img.alt;

    if (linkElement.title && !isGenericText(linkElement.title)) return linkElement.title;

    const parent = linkElement.parentElement;
    if (parent) {
      const clone = parent.cloneNode(true);
      const linkClone = clone.querySelector('a');
      if (linkClone) linkClone.remove();
      const parentText = clone.textContent?.trim();
      if (parentText && parentText.length > 2 && parentText.length < 100 && !isGenericText(parentText)) {
        return parentText;
      }
    }

    let element = linkElement;
    while (element && element !== document.body) {
      element = element.parentElement;
      if (element) {
        const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
        for (const heading of headings) {
          if (heading.compareDocumentPosition(linkElement) & Node.DOCUMENT_POSITION_FOLLOWING) {
            const headingText = heading.textContent?.trim();
            if (headingText && headingText.length < 100) {
              if (linkText && linkText.length > 1 && !isGenericText(linkText)) {
                return `${headingText} - ${linkText}`;
              }
              return headingText;
            }
          }
        }
      }
    }

    const urlFilename = getFilenameFromUrl(linkElement.href);
    if (urlFilename) {
      return urlFilename.replace(/\.[^.]+$/, '').replace(/_/g, ' ');
    }

    return 'unnamed';
  }

  // Find main content container
  function findMainContent() {
    const selectors = ['#app_content', '.io-nejvyssi-obal', 'main[role="main"]', 'main', '[role="main"]', '.content', '#content', 'article'];
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) return element;
    }
    return document.body;
  }

  // Extract page title
  function extractPageTitle() {
    const ioHeader = document.querySelector('#io-name-header');
    if (ioHeader) {
      const title = ioHeader.textContent?.trim();
      if (title) return sanitizeFilename(title);
    }

    const courseTitle = document.querySelector('.predmet-nazev, .course-title');
    if (courseTitle) {
      const title = courseTitle.textContent?.trim();
      if (title) return sanitizeFilename(title);
    }

    const h1 = document.querySelector('h1');
    if (h1) {
      const title = h1.textContent?.trim();
      if (title) return sanitizeFilename(title);
    }

    const docTitle = document.title?.trim();
    if (docTitle) {
      return sanitizeFilename(
        docTitle
          .replace(/\s*[-|–]\s*IS\s*MUNI.*$/i, '')
          .replace(/\s*[-|–]\s*Informační systém.*$/i, '')
          .replace(/Interaktivní osnova/i, '')
          .trim()
      );
    }

    return 'curriculum';
  }

  // Extract all stylesheets from the page
  function extractStyles() {
    const styles = [];
    document.querySelectorAll('style').forEach(style => {
      styles.push(style.textContent);
    });

    const stylesheetUrls = [];
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (link.href) stylesheetUrls.push(link.href);
    });

    return { inlineStyles: styles.join('\n'), stylesheetUrls };
  }

  // Inject script into page context
  function injectScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${url}`));
      document.head.appendChild(script);
    });
  }

  // Generate PDF by injecting scripts into page context
  let pdfGeneratorReady = false;

  async function initPdfGenerator() {
    if (pdfGeneratorReady) return;

    try {
      // Inject html2pdf library
      await injectScript(chrome.runtime.getURL('lib/html2pdf.bundle.min.js'));
      // Inject our PDF generator script
      await injectScript(chrome.runtime.getURL('pdf-generator.js'));
      pdfGeneratorReady = true;
      console.log('PDF generator initialized');
    } catch (error) {
      console.error('Failed to initialize PDF generator:', error);
      throw error;
    }
  }

  async function generatePdf() {
    await initPdfGenerator();

    return new Promise((resolve, reject) => {
      const requestId = Math.random().toString(36).substring(7);
      const title = extractPageTitle();

      // Listen for result
      const handler = (event) => {
        if (event.detail.requestId !== requestId) return;
        window.removeEventListener('__studyPathPdfResult', handler);

        if (event.detail.success) {
          resolve(event.detail.pdfBase64);
        } else {
          reject(new Error(event.detail.error || 'PDF generation failed'));
        }
      };

      window.addEventListener('__studyPathPdfResult', handler);

      // Set timeout
      setTimeout(() => {
        window.removeEventListener('__studyPathPdfResult', handler);
        reject(new Error('PDF generation timed out'));
      }, 60000);

      // Trigger PDF generation
      window.dispatchEvent(new CustomEvent('__studyPathGeneratePdf', {
        detail: {
          requestId,
          contentSelector: '#app_content',
          title
        }
      }));
    });
  }

  // Main extraction function
  function extractContent() {
    const mainContent = findMainContent();
    const title = extractPageTitle();
    const { inlineStyles, stylesheetUrls } = extractStyles();

    const links = mainContent.querySelectorAll('a[href]');
    const resources = [];
    const seenUrls = new Set();
    const nameCount = {};

    for (const link of links) {
      const href = link.href;
      if (seenUrls.has(href)) continue;
      if (href.includes('#io-q-') || href.includes('data-warp-id')) continue;
      if (!isInternalUrl(href)) continue;
      if (!isDownloadableUrl(href)) continue;

      seenUrls.add(href);

      let name = extractResourceName(link);
      name = sanitizeFilename(name);

      const baseName = name;
      if (nameCount[baseName]) {
        nameCount[baseName]++;
        name = `${baseName} (${nameCount[baseName]})`;
      } else {
        nameCount[baseName] = 1;
      }

      const extension = getExtension(href, name);
      if (!name.toLowerCase().endsWith(extension)) {
        name = name + extension;
      }

      resources.push({
        url: href,
        name: name,
        linkText: link.textContent?.trim() || ''
      });
    }

    const contentHtml = mainContent.innerHTML;

    return {
      title,
      content: contentHtml,
      inlineStyles,
      stylesheetUrls,
      resources,
      url: window.location.href
    };
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'extractContent') {
      try {
        const data = extractContent();
        console.log('Study Path Downloader: Extracted', data.resources.length, 'resources');
        sendResponse(data);
      } catch (error) {
        console.error('Content extraction error:', error);
        sendResponse({ error: error.message });
      }
    } else if (message.action === 'generatePdf') {
      generatePdf()
        .then(base64Pdf => {
          sendResponse({ pdfBase64: base64Pdf });
        })
        .catch(error => {
          console.error('PDF generation error:', error);
          sendResponse({ error: error.message });
        });
      return true;
    }
    return true;
  });

  console.log('Study Path Downloader: Content script loaded');
})();
