const expenseInputcontainer = document.querySelector('.expense-input-container');
const addButton = document.getElementById('add-button');

function createNewExpenserow() {
    console.log(expenseInputcontainer.children.length)
    let currentNumberOfChildren = expenseInputcontainer.children.length;

    let userInputExpenses = document.createElement('div');
    userInputExpenses.classList.add('user-input-expenses');
    userInputExpenses.dataset.index = Number(currentNumberOfChildren + 1)
    console.log('new data set index: ' + userInputExpenses.dataset.index)

    let expenseContainer = document.createElement('div');
    
    let expenseInput = document.createElement('input');
    expenseInput.type = 'text';
    expenseInput.classList.add('expense-input');

    let amountcontainer = document.createElement('div');
    amountcontainer.classList.add('amount');

    let amountInput = document.createElement('input');
    amountInput.type = 'text';
    amountInput.classList.add('expense-amount-input');

    let checkBoxContainer = document.createElement('div');
    checkBoxContainer.classList.add('check')
    let checkBoxInput = document.createElement('input');
    checkBoxInput.type = 'checkbox';
    checkBoxInput.classList.add('checked');

    expenseContainer.appendChild(expenseInput);
    amountcontainer.appendChild(amountInput);
    checkBoxContainer.appendChild(checkBoxInput);
    userInputExpenses.append(expenseContainer, amountcontainer, checkBoxContainer);
    expenseInputcontainer.appendChild(userInputExpenses);

}

addButton.addEventListener('click', () => {
    createNewExpenserow();
})