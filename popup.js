'use strict';

const popupBody = document.getElementById('popup_body');
const designDiv = document.getElementById('design_div');
const showLinksBtn = document.getElementById('showLinksBtn');
const showFontSizeBtn = document.getElementById('showFontSizeBtn');
const showFontFamilyBtn = document.getElementById('showFontFamilyBtn');
const showFontColorBtn = document.getElementById('showFontColorBtn');
const showBgColorBtn = document.getElementById('showBgColorBtn');
const showImgBtn = document.getElementById('showImgBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

showLinksBtn.addEventListener('click', () => { sendToDo('showLinks') });
showFontSizeBtn.addEventListener('click', () => { sendToDo('showFontSize') });
showFontFamilyBtn.addEventListener('click', () => { sendToDo('showFontFam') });
showFontColorBtn.addEventListener('click', () => { sendToDo('showFontColor') });
showBgColorBtn.addEventListener('click', () => { sendToDo('showBGColor') });
showImgBtn.addEventListener('click', () => { sendToDo('showImageSizes') });
clearAllBtn.addEventListener('click', () => { sendToDo('clearAll') });

const sendToDo = todo => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { todo: todo, tabID: tabs[0].id });
  });
}