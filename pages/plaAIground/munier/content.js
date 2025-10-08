// Content script that runs on IS MU curriculum pages

(function() {
  'use strict';

  // Check if we're on a curriculum page
  function isCurriculumPage() {
    const url = window.location.href;
    const hasQwarp = url.includes('index.qwarp');
    const hasInteractiveElements = document.querySelector('.io-element, .io-kapitola-box, .io-nazev-kapitoly');
    return hasQwarp && hasInteractiveElements;
  }

  // Notify background script about curriculum detection
  function notifyBackgroundScript() {
    if (isCurriculumPage()) {
      chrome.runtime.sendMessage({ type: 'CURRICULUM_DETECTED' });
    } else {
      chrome.runtime.sendMessage({ type: 'CURRICULUM_NOT_DETECTED' });
    }
  }

  // Extract curriculum data
  function extractCurriculumData() {
    const data = {
      title: '',
      content: '',
      styles: '',
      linkedPages: []
    };

    // Extract curriculum title
    const titleElement = document.querySelector('#app_name, .io-uvodni-nazev-osnovy, h1');
    data.title = titleElement ? titleElement.textContent.trim() : 'Curriculum';

    // Extract all stylesheets from the page
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    data.styles = stylesheets.map(link => link.href).filter(href => href.includes('is.muni.cz'));

    // Get the main content container
    const contentContainer = document.querySelector('#io-kontejner, #app_content');
    if (!contentContainer) {
      throw new Error('Could not find curriculum content container');
    }

    // Clone the content to avoid modifying the original page
    const contentClone = contentContainer.cloneNode(true);

    // Extract all internal links (to other IS MU pages, PDFs, documents)
    const linkElements = contentClone.querySelectorAll('a[href]');
    
    linkElements.forEach((link, index) => {
      const href = link.href;
      const linkText = link.textContent.trim();
      
      // Skip empty links, anchors, and external sites
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
        return;
      }

      // Only process IS MU links and documents
      if (href.includes('is.muni.cz')) {
        // Determine type
        let type = 'page';
        if (href.includes('.pdf')) {
          type = 'pdf';
        } else if (href.includes('.doc') || href.includes('.docx')) {
          type = 'document';
        } else if (href.includes('.xls') || href.includes('.xlsx')) {
          type = 'spreadsheet';
        } else if (href.includes('.ppt') || href.includes('.pptx')) {
          type = 'presentation';
        } else if (href.includes('/auth/el/') || href.includes('qwarp')) {
          type = 'html_page';
        }

        // Sanitize link text for filename
        const sanitizedName = linkText
          .replace(/[^a-zA-Z0-9_\-\s]/g, '_')
          .replace(/\s+/g, '_')
          .substring(0, 100) || `link-${index}`;

        data.linkedPages.push({
          url: href,
          type: type,
          originalName: linkText,
          sanitizedName: sanitizedName
        });

        // Mark the link in the content so we can reference the downloaded file
        link.setAttribute('data-offline-ref', sanitizedName);
        link.setAttribute('data-offline-type', type);
      }
    });

    // Remove large media elements to keep content lean
    contentClone.querySelectorAll('img, video, audio').forEach(el => {
      const placeholder = document.createElement('span');
      placeholder.textContent = `[${el.tagName} removed for offline viewing]`;
      placeholder.style.cssText = 'color: #999; font-style: italic;';
      el.parentNode?.replaceChild(placeholder, el);
    });

    // Get the HTML content
    data.content = contentClone.innerHTML;

    return data;
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'EXTRACT_CURRICULUM') {
      try {
        const data = extractCurriculumData();
        sendResponse({ success: true, data: data });
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    }
    return true; // Keep the message channel open for async response
  });

  // Check page on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', notifyBackgroundScript);
  } else {
    notifyBackgroundScript();
  }

  // Also check when DOM changes (for dynamic content)
  const observer = new MutationObserver(() => {
    notifyBackgroundScript();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
