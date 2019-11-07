'use strict';
export { PlayerStore };

class PlayerStore {
  db;

  constructor() {
    this.initDB();
  }

  initDB() {
    const request = indexedDB.open('GPHud');
    request.onupgradeneeded = () => {
      // The database did not previously exist, so create object stores and indexes.
      const db = request.result;
      const store = db.createObjectStore("players", {keyPath: "playerId"});
    };

    request.onsuccess = () => {
      this.db = request.result;
    }
  }

  getAllPlayerStats(callback) {
    const transaction = this.db.transaction(["players"], "readwrite");
    const objectStore = transaction.objectStore("players");

    const objectStoreRequest = objectStore.getAll();

    objectStoreRequest.onsuccess = (event) => {
      const myRecord = objectStoreRequest.result;
      if (callback) {
        callback(null, myRecord);
      }
    };
    objectStoreRequest.onerror = function(event) {
      if (callback) {
        callback(objectStoreRequest.error, null);
      }
    };
  }

  getPlayerStats(playerId, callback) {
    const transaction = this.db.transaction(["players"], "readwrite");
    const objectStore = transaction.objectStore("players");

    const objectStoreRequest = objectStore.get(playerId);

    objectStoreRequest.onsuccess = (event) => {
      const myRecord = objectStoreRequest.result;
      if (callback) {
        callback(null, myRecord);
      }
    };
    objectStoreRequest.onerror = function(event) {
      if (callback) {
        callback(objectStoreRequest.error, null);
      }
    };
  }

  putPlayerStats(playerStats, callback) {
    const transaction = this.db.transaction(["players"], "readwrite");
    const objectStore = transaction.objectStore("players");

    const objectStoreRequest = objectStore.put(playerStats);

    objectStoreRequest.onsuccess = (event) => {
      const myRecord = objectStoreRequest.result;
      if (callback) {
        callback(null, myRecord);
      }
    };
    objectStoreRequest.onerror = function(event) {
      if (callback) {
        callback(objectStoreRequest.error, null);
      }
    };
  }

  deletePlayerStats(playerId, callback) {
    const transaction = this.db.transaction(["players"], "readwrite");
    const objectStore = transaction.objectStore("players");

    const objectStoreRequest = objectStore.delete(playerId);

    objectStoreRequest.onsuccess = (event) => {
      const myRecord = objectStoreRequest.result;
      if (callback) {
        callback(null, myRecord);
      }
    };
    objectStoreRequest.onerror = function(event) {
      if (callback) {
        callback(objectStoreRequest.error, null);
      }
    };
  }
}
