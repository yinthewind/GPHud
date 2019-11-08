'use strict';

export { cardRe, actionTypes };

const cardRe = /card-[2-9akqjt][shdc]/;

const actionTypes = {
	PLAYER_ACTION: 'playerAction',
	HOLE_CARD: 'holdCard',
	COMMUNITY_CARD: 'communityCard',
	POT: 'pot',
	HAND_START: 'handStart',
	HAND_END: 'handEnd',
}
