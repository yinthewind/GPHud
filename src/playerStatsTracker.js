'use strict';
import { PlayerStore } from './playerStore';
import { HandRecordParser } from './handRecordParser';
export { PlayerStatsTracker };
 
class PlayerStatsTracker {
  static playerStats = {};
  playerStore = new PlayerStore();
  handRecordParser = new HandRecordParser();

  constructor() { }

  async getPlayerStatsByIdList(playerIdList) {
    const res = {};
    for (let playerId of playerIdList) {
      // get stats in cache
      let playerStats = PlayerStatsTracker.playerStats[playerId];
      // get stats in indexedDB if not found in cache
      if (!playerStats) {
        playerStats = await this.playerStore.getPlayerStatsById(playerId);
        PlayerStatsTracker.playerStats[playerId] = playerStats;
      }
      if (playerStats) {
        res[playerId] = Object.assign({}, playerStats);
      }
    }
    return res;
  }

  async updatePlayerStatsByHandRecords(handRecords) {
    if (handRecords.length) {
      const addedStats = this.handRecordParser.parseAllHandRecords(handRecords);
      const playerIdList = Object.keys(addedStats);
      const existingStats = await this.getPlayerStatsByIdList(playerIdList);

      const statsList = [];

      for (let playerId in addedStats) {
        const added = addedStats[playerId];
        const existing = existingStats[playerId];
        if (existing) {
          const newStats = this.handRecordParser.combineStats(existing, added);
          statsList.push(newStats);
          PlayerStatsTracker.playerStats[playerId] = newStats;
        } else {
          statsList.push(added);
          PlayerStatsTracker.playerStats[playerId] = added;
        }
      }

      this.playerStore.putPlayerStatsByList(statsList);
    }
  }
}
