'use strict';
import { actionActions } from './constants';
export { HandRecordParser };

// const actions = ['SMALL_BLIND', 'BIG_BLIND', 'RAISE', 'CHECK', 'CALL', 'FOLD'];

class HandRecordParser {
  constructor() {}

  initPlayerStats(player) {
    return {
      playerId: player,
      handsCount: 1,
      vpip: 0,
      pfr: 0,
      pf3b: 0,
      pf4b: 0
    };
  }

  initHandState() {
    return {
      betLevel: 0
    }
  }

  parsePreFlopAction(actionItem, handState, stats) {
    const { action, player } = actionItem;
    if (!stats[player]) {
      stats[player] = this.initPlayerStats(player);
    }
    const playerStats = stats[player];
    switch (action) {
      case actionActions.BIG_BLIND:
        handState.betLevel++;
        break;
  
      case actionActions.RAISE:
        playerStats.vpip = 1;
        playerStats.pfr = 1;
        handState.betLevel++;
        if (handState.betLevel === 3) {
          playerStats.pf3b = 1;
        } else if (handState.betLevel === 4) {
          playerStats.pf4b = 1;
        }
        break;
  
      case actionActions.CALL:
        playerStats.vpip = 1;
        break;
    
      default:
        break;
    }
  }

  parsePreFlopActions(actions, stats) {
    const handState = this.initHandState();
    actions.forEach(actionItem => {
      this.parsePreFlopAction(actionItem, handState, stats);
    });
  }

  parseHandRecord(handRecord) {
    const playerStats = {};
    // preflop
    this.parsePreFlopActions(handRecord.preflop_actions, playerStats);
  
    // flop
  
    // turn
  
    // river
  
    // showdown
  
    return playerStats;
  }

  combineStats(existing, added) {
    if (existing.playerId !== added.playerId) {
      return;
    }

    const res = Object.assign({}, existing);

    for (let key in res) {
      if (typeof res[key] === 'number' && typeof added[key] === 'number') {
        res[key] += added[key];
      }
    }

    return res;
  }

  parseAllHandRecords(handRecords) {
    const statsList = [];
    handRecords.forEach((handRecord) => {
      statsList.push(this.parseHandRecord(handRecord));
    });

    const output = statsList.reduce((acc, stats) => {
      for (let playerId in stats) {
        const playerStats = stats[playerId];
        if (acc[playerId]) {
          const existingStats = acc[playerId];
          acc[playerId] = this.combineStats(existingStats, playerStats);
        } else {
          acc[playerId] = playerStats;
        }
      }
      return acc;
    }, {});

    return output;
  }
}

