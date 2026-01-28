// Popup script - handles UI interactions and communicates with background worker

const downloadBtn = document.getElementById('downloadBtn');
const statusMessage = document.getElementById('statusMessage');
const progress = document.getElementById('progress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const resourceCount = document.getElementById('resourceCount');

// UI state management
function setStatus(message, type = 'normal') {
  statusMessage.textContent = message;
  statusMessage.className = 'status-message';
  if (type === 'error') statusMessage.classList.add('error');
  if (type === 'success') statusMessage.classList.add('success');
}

function setProgress(current, total) {
  progress.style.display = 'block';
  const percent = total > 0 ? (current / total) * 100 : 0;
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${current} of ${total} files`;
}

function hideProgress() {
  progress.style.display = 'none';
}

function setButtonEnabled(enabled) {
  downloadBtn.disabled = !enabled;
}

// Check if we're on a valid MUNI page
async function checkCurrentPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.url || !tab.url.includes('muni.cz')) {
      setStatus('Please navigate to an IS MUNI curriculum page.', 'error');
      setButtonEnabled(false);
      return null;
    }
    return tab;
  } catch (error) {
    console.error('Error checking page:', error);
    setStatus('Error checking current page.', 'error');
    setButtonEnabled(false);
    return null;
  }
}

// Main download handler
async function handleDownload() {
  const tab = await checkCurrentPage();
  if (!tab) return;

  setButtonEnabled(false);
  setStatus('Extracting page content...');
  hideProgress();

  try {
    // Inject content script and extract page data
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    // Send message to content script to extract data
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractContent' });

    if (!response || response.error) {
      throw new Error(response?.error || 'Failed to extract content');
    }

    const { title, content, inlineStyles, stylesheetUrls, resources } = response;
    resourceCount.textContent = `Found ${resources.length} resource(s)`;

    setStatus('Starting download...');
    setProgress(0, resources.length + 2); // +2 for curriculum PDF and HTML

    // Send to background worker for processing
    chrome.runtime.sendMessage({
      action: 'startDownload',
      data: { title, content, inlineStyles, stylesheetUrls, resources, tabId: tab.id }
    });

  } catch (error) {
    console.error('Download error:', error);
    setStatus(`Error: ${error.message}`, 'error');
    setButtonEnabled(true);
  }
}

// Listen for progress updates from background worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'progressUpdate':
      setProgress(message.current, message.total);
      setStatus(message.status);
      break;

    case 'downloadComplete':
      setStatus(`Download complete! ${message.successful} of ${message.total} files.`, 'success');
      setButtonEnabled(true);
      if (message.failed > 0) {
        resourceCount.textContent = `${message.failed} file(s) failed to download`;
      }
      break;

    case 'downloadError':
      setStatus(`Error: ${message.error}`, 'error');
      setButtonEnabled(true);
      break;
  }
});

// Initialize
downloadBtn.addEventListener('click', handleDownload);
checkCurrentPage();
