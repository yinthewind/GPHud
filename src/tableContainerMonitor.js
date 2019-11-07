'use strict';
export { monitorTableContainer };

let skipMutation = (mutation, blackList) => {
	for(let className of blackList) {
		if (mutation.target.classList.contains(className)) {
			return true;
		}
	};
	return false;
}
	
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

		//console.log(mutation.target.addedNodes);
		//console.log(xmlDict);
		chrome.runtime.sendMessage(JSON.stringify(xmlDict));

		/*
		let parser = new DOMParser();
		let target = parser.parseFromString(xmlDict.target, 'text/html').body.firstElementChild;
		console.log(target);
		for(let addedNode of xmlDict.added) {
			let node = parser.parseFromString(addedNode).body.firstElementChild;
			console.log(node);
		}
		*/
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

	observer.observe(tableContainer, { childList: true });
};
