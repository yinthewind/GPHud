'use strict';

export { Hand, HandRecorder };
import { actionTypes } from './constants.js';

const stages = {
	PREFLOP: 'preflop',
	FLOP: 'flop',
	TURN: 'turn',
	RIVER: 'river',
}

class HandRecorder {
	hand;

	constructor() {
		this.hand = new Hand();
	}

	record(action) {

		let finished = this.hand.record(action);

		if (finished) {
			let result = this.hand.data;
			this.hand.reset();

			if (this.hand.validate()) {
				return result;
			}
		}
	}
}

class Hand {
	data;
	stage;

	constructor() {
		console.log('new hand created');
		this.reset();
	}

	reset() {
		this.data = this.newHand();
		this.stage = stages.PREFLOP;
	}

	newHand() {
		return {
			id: null,
			stake: null,
			timestamp: null,
			table: null,
			seats: [],
			button: null,
			holeCards: [],
			preflop: {
				actions: [],
			},
			flop: {
				actions: [],
				cards: [],
			},
			turn: {
				actions: [],
				cards: [],
			},
			river: {
				actions: [],
				cards: [],
			},
			showdown: [],
			showCards: [],
			winner: null,
			winningAmount: null,
			pot: null,
		}
	}

	record(action) {
		if (!action) {
			return;
		}
		
		if (action.type == actionTypes.HAND_START) {
			this.reset();
			this.data.id = action.handId;
			return;
		}

		if (action.type == actionTypes.HAND_END) {
			this.data.winner = action.winner;
			this.data.winningAmount = action.amount;
			return true;
		}

		if (action.type == actionTypes.PLAYER_ACTION) {
			this.data[this.stage].actions.push(action);

		} else if (action.type == actionTypes.HOLE_CARD) {
			this.data.holeCards.push(action.card);

		} else if (action.type == actionTypes.COMMUNITY_CARD) {

			if (this.stage == stages.PREFLOP) {
				this.stage = stages.FLOP;
			} else if (this.data[this.stage].cards.length == 3) {
				this.stage = stages.TURN;
			} else if (this.stage == stages.TURN) {
				this.stage = stages.RIVER;
			}
			this.data[this.stage].cards.push(action.card);

		} else if (action.type == actionTypes.POT) {
			this.data.pot = action.value;
		} else if (action.type == actionTypes.SHOWDOWN) {
			this.data.showdown.push(action);
		} else if (action.type == actionTypes.SHOWCARDS) {
			this.data.showCards.push(action);
		}
	}

	// check if this is a complete and valid hand record
	validate() {
		return true;
	}
}
