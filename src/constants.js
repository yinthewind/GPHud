'use strict';

export { cardRe, actionTypes, actionActions };

const cardRe = /card-[2-9akqjt][shdc]/;

const actionTypes = {
	PLAYER_ACTION: 'playerAction',
	HOLE_CARD: 'holdCard',
	COMMUNITY_CARD: 'communityCard',
	POT: 'pot',
	HAND_START: 'handStart',
	HAND_END: 'handEnd',
};

const actionActions = {
	SMALL_BLIND: 'Small Blind',
	BIG_BLIND: 'Big Blind',
	RAISE: 'Raise',
	CALL: 'Call',
	FOLD: 'Fold',
	CHECK: 'Check',
	MUCK: 'Much'
};
