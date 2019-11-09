'use strict';

let textArea = document.getElementById('output');
let texts = [];

chrome.runtime.onMessage.addListener((msg) => {
	texts.push(msg);
});

document.addEventListener('DOMContentLoaded', function() {

	document.querySelector('button#btn_display').addEventListener('click', function() {
		textArea.innerText = texts.join('\n');
	});

	document.querySelector('button#btn_download').addEventListener('click', function() {
		let data = JSON.stringify(texts);
		let url = "data:application/json;base64," + btoa(data);

		let now = new Date();
		let filename = "GPMutations-" + now.toISOString().slice(0,16).replace(/:/g, "_") + ".json";

		chrome.downloads.download({
			url: url,
			filename: filename,
		});
	});
});
