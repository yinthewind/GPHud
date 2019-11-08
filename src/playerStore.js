'use strict';
export { PlayerStore };
import { openDB } from 'idb';

class PlayerStore {
  db;

  constructor() {
    this.initDB();
  }

  initDB() {
    const open = indexedDB.open('GPHud');
    open.onupgradeneeded = () => {
      // The database did not previously exist, so create object stores and indexes.
      const db = open.result;
      db.createObjectStore("players", {keyPath: "playerId"});
    };

    open.onsuccess = () => {
      const db = open.result;
      db.close();
    }
  }

  async getAllPlayerStats() {
    const db = await openDB('GPHud');
    const tx = await db.transaction('players', 'readonly');
    const store = tx.objectStore('players');
    const allSavedItems = await store.getAll();
    db.close();
    return allSavedItems;
  }

  async getPlayerStatsById(playerId) {
    const db = await openDB('GPHud');
    const tx = await db.transaction('players', 'readonly');
    const store = tx.objectStore('players');
    const stats = await store.get(playerId);
    db.close();
    return stats;
  }

  async getPlayerStatsByIdList(playerIdList) {
    const db = await openDB('GPHud');
    const tx = await db.transaction('players', 'readonly');
    const store = tx.objectStore('players');
    const res = {};
    for (let playerId of playerIdList) {
      res[playerId] = await store.get(playerId);
    }
    db.close();
    return res;
  }

  async putPlayerStats(playerStats) {
    const db = await openDB('GPHud');
    const tx = await db.transaction('players', 'readwrite');
    const store = tx.objectStore('players');
    await store.put(playerStats);
    db.close();
  }

  async putPlayerStatsByList(playerStatsList) {
    const db = await openDB('GPHud');
    const tx = await db.transaction('players', 'readwrite');
    const store = tx.objectStore('players');
    for (let playerStats of playerStatsList) {
      await store.put(playerStats);
    }
    db.close();
  }

  async deletePlayerStatsById(playerId) {
    const db = await openDB('GPHud');
    const tx = await db.transaction('players', 'readwrite');
    const store = tx.objectStore('players');
    await store.delete(playerId);
    db.close();
  }
}
