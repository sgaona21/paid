const fs = require('fs');

const filePath = './data.txt';

// 1. Read existing data
const raw = fs.readFileSync(filePath, 'utf8');
const expenses = JSON.parse(raw);

// 2. Add a new expense
const newExpense = {
  name: 'Netflix',
  amount: 15.99,
  isPaid: true,
  date: new Date().toISOString()
};

expenses.push(newExpense);

// 3. Write it back to the file
fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));

console.log('Expense saved!');
