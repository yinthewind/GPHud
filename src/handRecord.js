'use strict';

export { Hand };

class Hand {
	record;

	constructor(actions) {
		this.record = {
			id: null,
			stake: null,
			timestamp: null,
			table: null,
			seats: [],
			button: null,
			holeCards: [],
			preflopActions: [],
			flopCards: [],
			flopActions: [],
			turnCard: [],
			turnActions: [],
			riverCard: [],
			riverActions: [],
			showdown: null,
			summary: null,
		}

		// fill this.record with array of actions
	}
}
