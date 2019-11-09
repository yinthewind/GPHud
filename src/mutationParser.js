'use strict';

const util = require('util');
export { parseMutation }; 
import { actionTypes, cardRe } from './constants.js';

const parseMutation = (mutationStr) => {
	var mutationDict;

	mutationDict = JSON.parse(mutationStr);
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

	return parseMutationNodes({
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
	let player = data.parent.querySelector('div.player-name').textContent.trim();
	let seatBalance = data.parent.querySelector('div.seat-balance').textContent.trim();
	let actionAmount = data.parent.querySelector('div.action-amount').textContent.trim();

	return {
		type: actionTypes.PLAYER_ACTION,
		player: player,
		action: action,
		actionAmount: actionAmount,
		seatBalance: seatBalance,
	};
}

let singleCardProcessor = (node) => {
	let span = node.querySelector('span.skin__card-image');
	for(let cls of span.classList) {
		let m = cls.match(cardRe);
		if (m) {
			return m[1];
		}
	}
}

let cardsContainerProcessor = (data) => {

	if (!data.added) {
		return;
	}

	for(let node of data.added) {
		let card = singleCardProcessor(node);
		if (!card) {
			return;
		}
		return {
			type: actionTypes.HOLE_CARD,
			card: card,
		}
	}
}

let communityCardsProcessor = (data) => {
	
	if (!data.added) {
		return;
	}
	
	for(let node of data.added) {
		let card = singleCardProcessor(node);
		if (!card) {
			return;
		}
		return {
			type: actionTypes.COMMUNITY_CARD,
			card: card,
		}
	}
}

let mainPotProcessor = (data) => {
	
	if (!data.added || data.added.length != 1) {
		return;
	}

	let potValue = data.added[0].querySelector('span.pot-value').textContent;
	return {
		type: actionTypes.POT,
		value:  potValue,
	};
}

let tableEventLogProcessor = (data) => {
	
	if (!data.added || data.added.length != 1) {
		return;
	}

	let newNode = data.added[0].querySelector('div');
	if (newNode.classList.contains('hand-started')) {
		let handId = newNode.textContent.split(':')[1];
		return {
			type: actionTypes.HAND_START,
			handId: handId,
		}
	}

	let nameSpan = newNode.querySelector('span.chat-player-name');
	if (nameSpan) {
		let winner = nameSpan.textContent
		let amount = newNode.textContent.split(' ').pop();
		return {
			type: actionTypes.HAND_END,
			winner: winner,
			amount: amount,
		}
	}

	let text = newNode.textContent;
	if (!text || text.includes('More time')) {
		return;
	}

	let cardGroup = newNode.querySelector('span.card-group');
	if (cardGroup) {
		let numNodes = cardGroup.querySelectorAll('span.card-str');
		let suitNodes = cardGroup.querySelectorAll('span.log-card');

		let nums = [];
		for(let node of numNodes) {
			nums.push(node.textContent.toLowerCase());
		}
		let suits = [];
		for(let node of suitNodes) {
			suits.push(node.classList[1])
		}

		let cards = nums.map((num, i) => {
			return nums[i] + suits[i]
		})
		let nameAndHandRegex = /(.*) has ([A-Z ]*)/

		if (nameAndHandRegex.test(text)) {
			let match = text.match(nameAndHandRegex);
			return {
				type: actionTypes.SHOWDOWN,
				player: match[1],
				finalHand: match[2],
				cards: cards,
			}
		}

		let nameAndHoleCards = /(.*) shows /
		let match = text.match(nameAndHoleCards);

		return {
			type: actionTypes.SHOWCARDS,
			cards: cards,
			player: match[1],
		}
	}
}

let processors = {
	//'seat-balance': seatBalanceProcessor,
	'action-text': actionTextProcessor,
	'cards-container': cardsContainerProcessor,
	'community-cards': communityCardsProcessor,
	'main-pot': mainPotProcessor,
	'table-event-log': tableEventLogProcessor,
};

const parseMutationNodes = (data) => {
	for(let [key, processor] of Object.entries(processors)) {
		if(data.target.classList.contains(key)) {
			let action = processor(data);
			return action;
		}
	}
}
