'use strict';

export { Hand };
import { actionTypes } from './constants.js';

const stages = {
	PREFLOP: 'preflop',
	FLOP: 'flop',
	TURN: 'turn',
	RIVER: 'river',
}

class Hand {
	data;
	stage = stages.PREFLOP;

	constructor() {
		console.log('new hand created');
		this.data = this.newHand();
	}

	newHand = () => {
		this.data = {
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
			showdown: null,
			summary: null,
			winner: null,
			winningAmount: null,
			pot: null,
		}
	}

	record = (action) => {

		if (!action) {
			return;
		}
		
		if (action.type == actionTypes.HAND_START) {
			this.data = this.newHand();
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
		}
	}

	// check if this is a complete and valid hand record
	validate = () => {
	}
}
