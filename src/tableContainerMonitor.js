const tableContainer = document.getElementsByClassName('table-view-container')[0];
const config = { childList: true };

const tableActionParser = function(mutationList, observer) {
	for(let mutation of mutationList) {
		console.log(mutation);
	}
};

const observeTable = function(tableId) {
	let table = document.getElementById(tableId);
	let config = { childList: true, subtree: true };

	const observer = new MutationObserver(tableActionParser);
	observer.observe(table, config);
}

const observer = new MutationObserver(function(mutationList, observer) {
	for(let mutation of mutationList) {
		for(let node of mutation.addedNodes) {
			if (node.classList.contains('table-container')) {
				observeTable(node.id);
			}
		};
	}
});
observer.observe(tableContainer, config);
