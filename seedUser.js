const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./files.db');

let username = 'admin';
let password = 'admin';
let role = 'admin';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    return console.error('Error hashing password:', err.message);
  }

  db.run(
    `INSERT INTO users (login, password, role) VALUES (?, ?, ?)`,
    [username, hash, role],
    function(err) {
      if (err) {
        return console.error('Error inserting user:', err.message);
      }
      console.log(`✅ User "${username}" added with ID ${this.lastID}`);
    }
  );
});
