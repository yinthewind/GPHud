'use strict';
export { parseHandRecord };

const actions = ['SMALL_BLIND', 'BIG_BLIND', 'RAISE', 'CHECK', 'CALL', 'FOLD'];

const initPlayerStats = (seats) => {
  const stats = {};
  seats.forEach(player => {
    stats[player] = {
      playerId: player,
      handsCount: 1,
      vpip: 0,
      pfr: 0,
      pf3b: 0,
      pf4b: 0
    };
  });
  return stats;
};

const initHandState = () => {
  return {
    betLevel: 0
  }
};

const parsePreFlopAction = (actionItem, handState, stats) => {
  const { action, playerId } = actionItem;
  const playerStats = stats[playerId];
  switch (action) {
    case 'BIG_BLIND':
      handState.betLevel++;
      break;

    case 'RAISE':
      playerStats.vpip = 1;
      playerStats.pfr = 1;
      handState.betLevel++;
      if (handState.betLevel === 3) {
        playerStats.pf3b = 1;
      } else if (handState.betLevel === 4) {
        playerStats.pf4b = 1;
      }
      break;

    case 'CALL':
      playerStats.vpip = 1;
      break;
  
    default:
      break;
  }


};

const parsePreFlopActions = (actions, stats) => {
  const handState = initHandState();
  actions.forEach(actionItem => {
    parsePreFlopAction(actionItem, handState, stats);
  });
};

const parseHandRecord = (handRecord) => {
  // set up
  const playerStats = initPlayerStats(handRecord.seats);

  // preflop
  parsePreFlopActions(handRecord.preflop_actions, playerStats);

  // flop

  // turn

  // river

  // showdown

  return playerStats;
};
