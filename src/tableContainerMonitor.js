'use strict';
export { monitorTableContainer };

let tableActionParser = function(mutationList, observer) {
	for(let mutation of mutationList) {
		if (mutation.target.classList.contains('time')) {
			return;
		}
		//let action = parseAction(mutation);
		console.log(mutation);
	}
};

let monitorTable = function(tableId) {
	let table = document.getElementById(tableId);
	let config = { childList: true, subtree: true };

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

	let config = { childList: true };
	observer.observe(tableContainer, config);
};
