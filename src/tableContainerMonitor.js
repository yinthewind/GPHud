'use strict';
export { monitorTableContainer };
import { parseMutation } from './mutationParser.js';
import { Hand } from './handRecord.js';

let match = (mutation) => {
	let whiteList = [
		'seat-balance',
		'action-text',
		'cards-container',
		'community-cards',
		'main-pot',
		'table-event-log',
	];

	for(let cls of whiteList) {
		if( mutation.target.classList.contains(cls)) {
			return true;
		}
	}
	return false;
}

let skipMutation = (mutation, blackList) => {
	for(let className of blackList) {
		if (mutation.target.classList.contains(className)) {
			return true;
		}
	}
}
	
var hand;
let tableActionParser = function(mutationList, observer) {
	for(let mutation of mutationList) {
		if (skipMutation(mutation, [
		   'time',
		   'seat-progressbar',
		   'canvas',
		   'avatar',
		   'fullstory-exclude',
		   'nano-slider',
		   'nano-pane',
		   'default-poker-table',
	    ])) {
		//if (!match(mutation)) {
			return;
		}

		let serializer = new XMLSerializer();
		let targetStr = serializer.serializeToString(mutation.target);
		let parentStr = serializer.serializeToString(mutation.target.parentNode);
		let xmlDict = {
			target: targetStr,
			parent: parentStr,
			added: [],
		};
		if (mutation.addedNodes) {
			mutation.addedNodes.forEach((node) => {
				let added = serializer.serializeToString(node);
				xmlDict.added.push(added);
			});
		}
		//console.log(mutation);

		let msg = JSON.stringify(xmlDict);
		chrome.runtime.sendMessage(msg);

		let action = parseMutation(msg);

		//console.log(hand);
		console.log(mutation);
		console.log(action);
	}
};

let monitorTable = function(tableId) {
	let table = document.getElementById(tableId);
	let config = {
		childList: true,
		subtree: true,
	};

	let observer = new MutationObserver(tableActionParser);
	observer.observe(table, config);
};

let observer = new MutationObserver(function(mutationList, observer) {
	for(let mutation of mutationList) {
		for(let node of mutation.addedNodes) {
			if (node.classList.contains('table-container')) {
				// new table found
				monitorTable(node.id);
			}
		};
	}
});

const monitorTableContainer = function(tableContainer) {

	observer.observe(tableContainer, { childList: true, attributes: true });
};
