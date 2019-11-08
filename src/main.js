'use strict';
import { monitorTableContainer } from './tableContainerMonitor.js';

/*
const app = document.getElementById('app');
const config = { childList: true, subtree: true };
const observer = new MutationObserver(function(mutationList, observer) {
	for(let mutation of mutationList) {
		for(let node of mutation.addedNodes) {
			if (node.classList.contains('view-port')) {
				let tableContainer = document.getElementsByClassName('table-view-container')[0];
				monitorTableContainer(tableContainer);
				return observer.disconnect();
			}
		}
	}
});
observer.observe(app, config);
*/

let tableContainer = document.getElementsByClassName('table-view-container')[0];
monitorTableContainer(tableContainer);
