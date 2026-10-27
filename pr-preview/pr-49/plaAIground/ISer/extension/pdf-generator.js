// This script runs in the PAGE context (not content script context)
// It generates PDF using html2pdf.js and communicates results via custom events

(function() {
  // Listen for PDF generation requests
  window.addEventListener('__studyPathGeneratePdf', async function(event) {
    const { requestId, contentSelector, title } = event.detail;

    console.log('PDF Generator: Starting PDF generation for', title);

    try {
      // Wait for html2pdf to be available
      if (typeof html2pdf === 'undefined') {
        throw new Error('html2pdf not loaded');
      }

      // Find main content
      const mainContent = document.querySelector(contentSelector) || document.querySelector('#app_content') || document.body;
      console.log('PDF Generator: Found main content', mainContent?.tagName);

      // Clone the content
      const clone = mainContent.cloneNode(true);

      // Remove problematic elements
      const removeSelectors = [
        'object', 'iframe', 'video', 'audio', 'canvas',
        '.print-hide', '.hide-for-print', 'nav', '.sticky_panel',
        '#left_menu', '.isi-lock', 'script', 'noscript',
        '.io-pdfjs', '.vidis', '[data-dropdown]', '.dropdown-pane'
      ];
      clone.querySelectorAll(removeSelectors.join(', ')).forEach(el => el.remove());

      // Remove/replace images with blob URLs
      clone.querySelectorAll('img').forEach(img => {
        if (img.src.startsWith('blob:') || !img.src) {
          img.remove();
        }
      });

      // Remove inline styles that might hide content
      clone.querySelectorAll('[style*="display: none"], [style*="display:none"], [style*="visibility: hidden"]').forEach(el => {
        el.style.display = 'block';
        el.style.visibility = 'visible';
      });

      // Force all text to be visible
      clone.querySelectorAll('*').forEach(el => {
        const computed = window.getComputedStyle(el);
        if (computed.color === 'rgba(0, 0, 0, 0)' || computed.color === 'transparent') {
          el.style.color = '#333';
        }
      });

      // Create a container div with explicit styling
      const container = document.createElement('div');
      container.id = '__studyPathPdfContainer';

      // Add inline CSS to ensure visibility
      const style = document.createElement('style');
      style.textContent = `
        #__studyPathPdfContainer {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 750px !important;
          background: white !important;
          padding: 40px !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
          color: #333 !important;
          z-index: 99999 !important;
        }
        #__studyPathPdfContainer * {
          max-width: 100% !important;
          word-wrap: break-word !important;
        }
        #__studyPathPdfContainer h1,
        #__studyPathPdfContainer h2,
        #__studyPathPdfContainer h3 {
          color: #1a1a1a !important;
          margin-top: 1em !important;
          margin-bottom: 0.5em !important;
        }
        #__studyPathPdfContainer a {
          color: #1976d2 !important;
        }
        #__studyPathPdfContainer .io-element {
          margin: 10px 0 !important;
          padding: 10px !important;
          background: #fafafa !important;
          border-left: 3px solid #1976d2 !important;
        }
        #__studyPathPdfContainer .io-element-title {
          font-weight: bold !important;
          color: #1a1a1a !important;
        }
      `;
      document.head.appendChild(style);

      // Build container content
      container.innerHTML = `
        <h1 style="margin: 0 0 30px 0; font-size: 28px; color: #1a1a1a; border-bottom: 3px solid #1976d2; padding-bottom: 15px;">
          ${title || 'Curriculum'}
        </h1>
      `;
      container.appendChild(clone);

      // Add to document body
      document.body.appendChild(container);

      // Force layout recalculation
      container.offsetHeight;

      console.log('PDF Generator: Container added, dimensions:', container.scrollWidth, 'x', container.scrollHeight);

      // Wait for images and rendering
      await new Promise(resolve => setTimeout(resolve, 1000));

      const opt = {
        margin: [10, 10, 10, 10],
        filename: (title || 'curriculum') + '.pdf',
        image: { type: 'jpeg', quality: 0.90 },
        html2canvas: {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          removeContainer: false,
          foreignObjectRendering: false,
          ignoreElements: function(element) {
            // Ignore elements that might cause issues
            return element.tagName === 'IFRAME' ||
                   element.tagName === 'OBJECT' ||
                   element.tagName === 'VIDEO';
          }
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break',
          avoid: ['h1', 'h2', 'h3', 'tr', '.io-element']
        }
      };

      console.log('PDF Generator: Starting html2pdf conversion');

      const pdfArrayBuffer = await html2pdf()
        .set(opt)
        .from(container)
        .outputPdf('arraybuffer');

      console.log('PDF Generator: PDF buffer generated, size:', pdfArrayBuffer.byteLength);

      // Clean up
      document.body.removeChild(container);
      document.head.removeChild(style);

      // Convert to base64
      const bytes = new Uint8Array(pdfArrayBuffer);
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
        binary += String.fromCharCode.apply(null, chunk);
      }
      const base64 = btoa(binary);

      console.log('PDF Generator: Base64 conversion done, length:', base64.length);

      // Send result back
      window.dispatchEvent(new CustomEvent('__studyPathPdfResult', {
        detail: { requestId, success: true, pdfBase64: base64 }
      }));

    } catch (error) {
      console.error('PDF Generator: Error:', error);
      // Clean up on error
      const container = document.getElementById('__studyPathPdfContainer');
      if (container) document.body.removeChild(container);
      const style = document.querySelector('style');
      if (style && style.textContent.includes('__studyPathPdfContainer')) {
        style.remove();
      }

      window.dispatchEvent(new CustomEvent('__studyPathPdfResult', {
        detail: { requestId, success: false, error: error.message }
      }));
    }
  });

  console.log('Study Path PDF Generator: Ready');
})();
