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
    // Check file extension
    if (CONFIG.downloadableExtensions.some(ext => lowerUrl.includes(ext))) {
      return true;
    }
    // Check for common download URL patterns
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
      .replace(/[/\\:*?"<>|]/g, '-')  // Replace illegal chars
      .replace(/\s+/g, ' ')            // Normalize whitespace
      .replace(/^\.+/, '_')            // Don't start with dots
      .trim()
      .substring(0, 200);              // Limit length
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
    } catch {
      // Ignore URL parsing errors
    }
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
    // Default to .pdf for download URLs without clear extension
    return '.pdf';
  }

  // IS MUNI specific: Extract name from element title or nearby context
  function extractISMuniResourceName(linkElement) {
    // 1. Check for .io-element-title in the same .io-element container
    const ioElement = linkElement.closest('.io-element');
    if (ioElement) {
      const titleEl = ioElement.querySelector('.io-element-title');
      if (titleEl) {
        const title = titleEl.textContent?.trim();
        if (title && !isGenericText(title)) {
          return title;
        }
      }
    }

    // 2. Check for .io-element-title as sibling (for links inside object fallback)
    const parent = linkElement.parentElement;
    if (parent) {
      const prevSibling = parent.previousElementSibling;
      if (prevSibling?.classList?.contains('io-element-title')) {
        const title = prevSibling.textContent?.trim();
        if (title && !isGenericText(title)) {
          return title;
        }
      }
    }

    // 3. Check for h1.io-verejne in nearest section (chapter heading)
    const section = linkElement.closest('[id^="prvek-obsah"], [id^="io-q-"]');
    if (section) {
      // Look backwards for the chapter heading
      let prev = section.previousElementSibling;
      while (prev) {
        const h1 = prev.querySelector('h1.io-verejne, h1');
        if (h1) {
          const heading = h1.textContent?.trim();
          if (heading && heading.length < 100) {
            return heading;
          }
        }
        prev = prev.previousElementSibling;
      }
    }

    // 4. Check for a.io-element-title (direct title link)
    if (linkElement.classList.contains('io-element-title')) {
      const title = linkElement.textContent?.trim();
      if (title && !isGenericText(title)) {
        return title;
      }
    }

    return null;
  }

  // Extract meaningful name for a resource link
  function extractResourceName(linkElement) {
    // Try IS MUNI specific extraction first
    const ismuniName = extractISMuniResourceName(linkElement);
    if (ismuniName) {
      return ismuniName;
    }

    // 1. Try link text
    let linkText = linkElement.textContent?.trim();
    if (linkText && !isGenericText(linkText)) {
      return linkText;
    }

    // 2. Check for image alt text (if link contains image)
    const img = linkElement.querySelector('img');
    if (img && img.alt && !isGenericText(img.alt)) {
      return img.alt;
    }

    // 3. Check title attribute
    if (linkElement.title && !isGenericText(linkElement.title)) {
      return linkElement.title;
    }

    // 4. Check parent element text
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

    // 5. Check nearest heading
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

    // 6. Fallback to URL filename
    const urlFilename = getFilenameFromUrl(linkElement.href);
    if (urlFilename) {
      // Remove extension for cleaner name, replace underscores with spaces
      return urlFilename.replace(/\.[^.]+$/, '').replace(/_/g, ' ');
    }

    return 'unnamed';
  }

  // Find main content container (IS MUNI specific)
  function findMainContent() {
    // IS MUNI specific selectors first
    const ismuniSelectors = [
      '#app_content',           // Main app content
      '.io-nejvyssi-obal',      // Interactive syllabus wrapper
      'main[role="main"]',
      'main'
    ];

    for (const selector of ismuniSelectors) {
      const element = document.querySelector(selector);
      if (element) return element;
    }

    // Generic fallbacks
    const genericSelectors = [
      '[role="main"]',
      '.content',
      '#content',
      'article'
    ];

    for (const selector of genericSelectors) {
      const element = document.querySelector(selector);
      if (element) return element;
    }

    return document.body;
  }

  // Extract page title (IS MUNI specific)
  function extractPageTitle() {
    // IS MUNI: Check for io-name-header first
    const ioHeader = document.querySelector('#io-name-header');
    if (ioHeader) {
      const title = ioHeader.textContent?.trim();
      if (title) return sanitizeFilename(title);
    }

    // IS MUNI: Check for course title in breadcrumb or header
    const courseTitle = document.querySelector('.predmet-nazev, .course-title');
    if (courseTitle) {
      const title = courseTitle.textContent?.trim();
      if (title) return sanitizeFilename(title);
    }

    // Try first h1
    const h1 = document.querySelector('h1');
    if (h1) {
      const title = h1.textContent?.trim();
      if (title) return sanitizeFilename(title);
    }

    // Fall back to document title
    const docTitle = document.title?.trim();
    if (docTitle) {
      // Clean common suffixes
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

  // Main extraction function
  function extractContent() {
    const mainContent = findMainContent();
    const title = extractPageTitle();

    // Find all links in content
    const links = mainContent.querySelectorAll('a[href]');
    const resources = [];
    const seenUrls = new Set();
    const nameCount = {};

    for (const link of links) {
      const href = link.href;

      // Skip if already processed
      if (seenUrls.has(href)) continue;

      // Skip navigation links, anchors
      if (href.includes('#io-q-') || href.includes('data-warp-id')) continue;

      // Check if internal and downloadable
      if (!isInternalUrl(href)) continue;
      if (!isDownloadableUrl(href)) continue;

      seenUrls.add(href);

      // Extract name
      let name = extractResourceName(link);
      name = sanitizeFilename(name);

      // Handle duplicates by appending number
      const baseName = name;
      if (nameCount[baseName]) {
        nameCount[baseName]++;
        name = `${baseName} (${nameCount[baseName]})`;
      } else {
        nameCount[baseName] = 1;
      }

      // Get extension
      const extension = getExtension(href, name);

      // Ensure name has extension
      if (!name.toLowerCase().endsWith(extension)) {
        name = name + extension;
      }

      resources.push({
        url: href,
        name: name,
        linkText: link.textContent?.trim() || ''
      });
    }

    // Get content HTML for PDF generation
    const contentHtml = mainContent.innerHTML;

    return {
      title,
      content: contentHtml,
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
        console.log('Resources:', data.resources.map(r => r.name));
        sendResponse(data);
      } catch (error) {
        console.error('Content extraction error:', error);
        sendResponse({ error: error.message });
      }
    }
    return true; // Keep message channel open for async response
  });

  console.log('Study Path Downloader: Content script loaded');
})();
