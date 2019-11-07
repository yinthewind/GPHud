'use strict';

const util = require('util');
export { parseMutation };

const parseMutation = (mutationStr) => {
	var mutationDict;

	try {
		mutationDict = JSON.parse(mutationStr);
	} catch (err) {
		console.log(mutationStr);
		return;
	}
	let parser = new DOMParser();
	let target = parser.parseFromString(mutationDict.target, 'text/html').body.firstElementChild;
	let parent = parser.parseFromString(mutationDict.parent, 'text/html').body;

	let added = [];
	for(let addedNode of mutationDict.added) {
		let node = parser.parseFromString(addedNode, 'text/html').body;
		added.push(node);
	}

	let action = parseMutationNodes({
		target: target,
		parent: parent,
		added: added,
		dict: mutationDict,
	});
}

let seatBalanceProcessor = (data) => {

	if (!data.added || data.added.length == 0) {
		return;
	}
	let player = data.parent.querySelector('div.player-name').textContent.trim();
	let seatBalance = data.parent.querySelector('div.seat-balance').textContent.trim();

	return {
		player: player,
		seatBalance: seatBalance,
	};
}

let actionTextProcessor = (data) => {
	if (!data.added || data.added.length != 1) {
		return;
	}
	if (data.added[0] == null) {
		return;
	}
	let action = data.added[0].innerHTML;

	if (!data.parent) {
		return;
	}
	//console.log(data.parent.outerHTML);
	let player = data.parent.querySelector('div.player-name').textContent.trim();
	let seatBalance = data.parent.querySelector('div.seat-balance').textContent.trim();
	let actionAmount = data.parent.querySelector('div.action-amount').textContent.trim();

	return {
		player: player,
		action: action,
		actionAmount: actionAmount,
		seatBalance: seatBalance,
	};
}

let cardsContainerPlayerProcessor = (data) => {

	let cardSpan = data.target.querySelector('span.skin__card-image');
	if (!cardSpan) {
		return;
	}
	if (cardSpan.classList.contains('card-back')) {
		return;
	}
	for(let cls of cardSpan.classList) {
		if (cls.startsWith('card-')) {
			return cls;
		}
	}
	return;
}

let processors = {
	//'seat-balance': seatBalanceProcessor,
	//'action-text': actionTextProcessor,
	'cards-container': cardsContainerPlayerProcessor,
};

const parseMutationNodes = (data) => {
	for(let [key, processor] of Object.entries(processors)) {
		if(data.target.classList.contains(key)) {
			let result = processor(data);
			if (result) {
				console.log(result);
			}
		}
	}
}
