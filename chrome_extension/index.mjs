'use strict';

let textArea = document.getElementById('output');
let text = '';

chrome.runtime.onMessage.addListener((msg) => {
	console.log(msg);
	text = text + msg + '\n';
	//textArea.innerText = text;
});

setInterval(()=> {
	textArea.innerText = text;
}, 15000);
