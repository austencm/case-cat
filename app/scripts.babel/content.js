chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  document.execCommand('paste');
});
