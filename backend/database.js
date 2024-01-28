// database.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE vagas (
      id INTEGER PRIMARY KEY,
      nome_empresa TEXT,
      nome_vaga TEXT,
      resposta TEXT,
      feedback TEXT
    )
  `);
});

module.exports = db;
