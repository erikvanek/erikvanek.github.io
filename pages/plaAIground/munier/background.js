// Background service worker for IS MU Offline Curriculum extension

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CURRICULUM_DETECTED') {
    // Change icon to green to indicate curriculum is detected
    chrome.action.setIcon({
      tabId: sender.tab.id,
      path: {
        16: 'icons/icon-16-active.png',
        48: 'icons/icon-48-active.png',
        128: 'icons/icon-128-active.png'
      }
    });
    
    // Enable the extension icon
    chrome.action.enable(sender.tab.id);
  } else if (message.type === 'CURRICULUM_NOT_DETECTED') {
    // Reset icon to inactive state
    chrome.action.setIcon({
      tabId: sender.tab.id,
      path: {
        16: 'icons/icon-16.png',
        48: 'icons/icon-48.png',
        128: 'icons/icon-128.png'
      }
    });
  }
});

// Reset icon when navigating away
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    chrome.action.setIcon({
      tabId: tabId,
      path: {
        16: 'icons/icon-16.png',
        48: 'icons/icon-48.png',
        128: 'icons/icon-128.png'
      }
    });
  }
});
