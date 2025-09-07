const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'me.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('DB open error', err);
  } else {
    console.log('Connected to SQLite DB at', DB_PATH);
  }
});

module.exports = db;
