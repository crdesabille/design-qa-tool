'use strict';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const showPageAction = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }

  switch (request.todo) {
    case 'openLinks': return console.log('openLinks');
    case 'checkLinks': return console.log('checkLinks');
    case 'showPageAction': return showPageAction();
    default:
      console.log('default');
      break;
  }
});

