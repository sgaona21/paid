const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

const db = new sqlite3.Database('./budget.db');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  amount REAL NOT NULL,
  isPaid INTEGER DEFAULT 0,
  date TEXT
)`);

// Add new expense
app.post('/expenses', (req, res) => {
  const { name, amount, isPaid, date } = req.body;
  db.run(
    `INSERT INTO expenses (name, amount, isPaid, date) VALUES (?, ?, ?, ?)`,
    [name, amount, isPaid ? 1 : 0, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Get all expenses
app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
