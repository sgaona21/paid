// ************** DOM VARIABLES ****************** //
const expenseInputcontainer = document.querySelector('.expense-input-container');
const addButton = document.getElementById('add-button');
const totalMonthlyAmount = document.querySelector('.total-monthly-amount');
const remainingAmount = document.querySelector('.remaining-amount');





// ******************* OBJECTS ************************ //
let rowTemplate = {"index": null, "expense": '', "amount": '', "isPaid": false};