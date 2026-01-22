/* ==========================================================================
   BLOB.JS
   Lava lamp background initialization and control
   ========================================================================== */

(function() {
  'use strict';

  /* -------------------------------------------------------------------------
     Configuration
     ------------------------------------------------------------------------- */
  
  const CONFIG = {
    blobCount: 5,
    // Gooey filter settings - controls how blobs merge
    gooBlur: 12,        // Higher = softer merge
    gooContrast: 20,    // Higher = sharper edges after merge
    gooThreshold: -8    // Adjusts the merge threshold
  };

  /* -------------------------------------------------------------------------
     Initialize Blob Background
     ------------------------------------------------------------------------- */
  
  function init() {
    createSvgFilters();
    createBlobContainer();
    addRandomAnimationDelays();
  }

  /* -------------------------------------------------------------------------
     Create SVG Filters for Gooey/Metaball Effect
     This filter makes blobs appear to merge when they overlap
     ------------------------------------------------------------------------- */
  
  function createSvgFilters() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('blob-svg-filters');
    svg.setAttribute('aria-hidden', 'true');
    
    svg.innerHTML = `
      <defs>
        <filter id="goo-filter" x="-50%" y="-50%" width="200%" height="200%">
          <!-- Blur the blobs together -->
          <feGaussianBlur 
            in="SourceGraphic" 
            stdDeviation="${CONFIG.gooBlur}" 
            result="blur" 
          />
          <!-- Increase contrast to create sharp edges where blobs merge -->
          <feColorMatrix 
            in="blur" 
            type="matrix" 
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 ${CONFIG.gooContrast} ${CONFIG.gooThreshold}" 
            result="goo" 
          />
          <!-- Composite original graphics on top for color preservation -->
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    `;
    
    document.body.insertBefore(svg, document.body.firstChild);
  }

  /* -------------------------------------------------------------------------
     Create Blob Container and Individual Blobs
     ------------------------------------------------------------------------- */
  
  function createBlobContainer() {
    const container = document.createElement('div');
    container.classList.add('blob-container');
    container.setAttribute('aria-hidden', 'true');
    
    // Create blob elements
    for (let i = 1; i <= CONFIG.blobCount; i++) {
      const blob = document.createElement('div');
      blob.classList.add('blob', `blob--${i}`);
      container.appendChild(blob);
    }
    
    // Insert at the beginning of body (behind everything)
    document.body.insertBefore(container, document.body.firstChild);
  }

  /* -------------------------------------------------------------------------
     Add Random Animation Delays
     Makes movement feel more organic and less synchronized
     ------------------------------------------------------------------------- */
  
  function addRandomAnimationDelays() {
    const blobs = document.querySelectorAll('.blob');
    
    blobs.forEach((blob) => {
      // Random delay between -15s and 0s (negative to offset starting position)
      const delay = Math.random() * -15;
      blob.style.animationDelay = `${delay}s`;
    });
  }

  /* -------------------------------------------------------------------------
     Visibility Change Handler
     Pause animations when tab is hidden (saves CPU/battery)
     ------------------------------------------------------------------------- */
  
  function handleVisibilityChange() {
    const blobs = document.querySelectorAll('.blob');
    const isPaused = document.hidden;
    
    blobs.forEach((blob) => {
      blob.style.animationPlayState = isPaused ? 'paused' : 'running';
    });
  }

  /* -------------------------------------------------------------------------
     Event Listeners
     ------------------------------------------------------------------------- */
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Pause animations when tab is not visible
  document.addEventListener('visibilitychange', handleVisibilityChange);

})();
