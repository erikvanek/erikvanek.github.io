// ES Module wrapper for JSZip
// JSZip uses UMD format, so we need to set up the environment

// Create a fake module.exports for JSZip to attach to
const module = { exports: {} };
const exports = module.exports;

// Include JSZip inline (will be replaced with actual content)
// For service worker, we need to fetch and eval, or use importScripts pattern

let JSZip = null;

export async function loadJSZip() {
  if (JSZip) return JSZip;

  // Fetch the JSZip library
  const response = await fetch(chrome.runtime.getURL('lib/jszip.min.js'));
  const code = await response.text();

  // Create a function that returns JSZip
  const wrapper = new Function('module', 'exports', code + '\nreturn module.exports;');
  const fakeModule = { exports: {} };
  JSZip = wrapper(fakeModule, fakeModule.exports);

  return JSZip;
}

export default { loadJSZip };
