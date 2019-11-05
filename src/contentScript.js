const viewPort = document.getElementById('viewPort');
const config = { attributes: true, childList: true, subtree: true };

const callback = function(mutationList, observer) {
	for(let mutation of mutationList) {
		if (mutation.type == 'childList') {
			console.log(mutation);
		} else if (mutation.type == 'attributes') {
			console.log(mutation);
		}
	}
}

const observer = new MutationObserver(callback);
observer.observe(viewPort, config);
