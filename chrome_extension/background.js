'use strict';

var indexTabId = -1;

chrome.browserAction.onClicked.addListener((activeTab) => {
	chrome.tabs.create({ url: 'index.html' }, (indexTab) => {
		indexTabId = indexTab.id;
	});
});

chrome.runtime.onMessage.addListener((msg) => {
	if (indexTabId != -1) {
		chrome.tabs.sendMessage(indexTabId, msg);
	}
	console.log(msg);
});
