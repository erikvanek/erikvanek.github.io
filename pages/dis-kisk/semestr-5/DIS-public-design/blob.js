/* ===========================================
   BLOB.JS
   Lava lamp background initialization
   =========================================== */

(function() {
  'use strict';

  /**
   * Initialize the blob background
   * Creates SVG filter and blob elements
   */
  function initBlobs() {
    // Create SVG filter for gooey/metaball effect
    createGooFilter();
    
    // Create blob container and blobs
    createBlobContainer();
    
    // Optional: Add slight random offset to starting positions
    randomizeStartPositions();
  }

  /**
   * Create SVG filter for the gooey effect
   * This makes blobs merge together when they touch
   */
  function createGooFilter() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('style', 'position: absolute; width: 0; height: 0;');
    svg.innerHTML = `
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 20 -10" 
            result="goo" 
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </defs>
    `;
    document.body.insertBefore(svg, document.body.firstChild);
  }

  /**
   * Create the blob container and individual blobs
   */
  function createBlobContainer() {
    const container = document.createElement('div');
    container.className = 'blob-container';
    
    // Create 5 blobs
    for (let i = 1; i <= 5; i++) {
      const blob = document.createElement('div');
      blob.className = `blob blob--${i}`;
      container.appendChild(blob);
    }
    
    // Insert at the beginning of body
    document.body.insertBefore(container, document.body.firstChild);
  }

  /**
   * Add slight random variation to blob animation delays
   * Makes the movement feel more organic
   */
  function randomizeStartPositions() {
    const blobs = document.querySelectorAll('.blob');
    
    blobs.forEach((blob) => {
      // Random animation delay (0-10 seconds)
      const delay = Math.random() * -10;
      blob.style.animationDelay = `${delay}s`;
    });
  }

  /**
   * Optional: Pause animations when tab is not visible
   * Saves CPU/battery
   */
  function handleVisibilityChange() {
    const container = document.querySelector('.blob-container');
    if (!container) return;
    
    if (document.hidden) {
      container.style.animationPlayState = 'paused';
    } else {
      container.style.animationPlayState = 'running';
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlobs);
  } else {
    initBlobs();
  }

  // Handle tab visibility
  document.addEventListener('visibilitychange', handleVisibilityChange);

})();
