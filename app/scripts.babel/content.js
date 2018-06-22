chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.editable) {
    return document.execCommand('paste');
  }

  const selection = window.getSelection();
  if (selection.rangeCount) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(request.text));
  }
});
