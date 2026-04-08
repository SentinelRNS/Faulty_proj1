const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./notes.db');

// Initialize the database
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, content TEXT)");
  
  // Seed some data if empty
  db.get("SELECT count(*) as count FROM notes", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO notes (user, content) VALUES ('admin', 'Welcome to QuickNote!')");
      db.run("INSERT INTO notes (user, content) VALUES ('guest', 'This is a public note.')");
    }
  });
});

module.exports = db;
