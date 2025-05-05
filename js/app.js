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

    let deleteButton = document.createElement('div');
    deleteButton.classList.add('delete');
    deleteButton.textContent = '❌';

    expenseContainer.appendChild(expenseInput);
    amountcontainer.appendChild(amountInput);
    checkBoxContainer.appendChild(checkBoxInput);
    userInputExpenses.append(expenseContainer, amountcontainer, checkBoxContainer, deleteButton);
    expenseInputcontainer.appendChild(userInputExpenses);

    let row = {};
    row.index = userInputExpenses.dataset.index;
    expenseInput.addEventListener('input', () => {
        console.log(expenseInput.value)
        row.expense = expenseInput.value;
        console.log(row);
    })
    amountInput.addEventListener('input', () => {
        row.amount = amountInput.value;
        console.log(row)
    })
    checkBoxInput.addEventListener('change', () => {
        row.isChecked = checkBoxInput.checked
        console.log(row)
    })

    deleteButton.addEventListener('click', (e) => {
        e.target.parentNode.remove();
    })
    userInputExpenses.addEventListener('mouseover', () => {
        deleteButton.style.visibility = 'visible';
    })

    userInputExpenses.addEventListener('mouseleave', () => {
        deleteButton.style.visibility = 'hidden';
    })
}

addButton.addEventListener('click', () => {
    createNewExpenserow();
});


fetch('./data.txt')
.then(response => response.json())
.then(data => console.log(data[0].name))

fetch('./data.txt')
.then(response => response.json())
.then(data => loadFromPoorDatabase(data))


function loadFromPoorDatabase(data) {
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
    expenseInput.value = data[0].name;

    let amountcontainer = document.createElement('div');
    amountcontainer.classList.add('amount');

    let amountInput = document.createElement('input');
    amountInput.type = 'text';
    amountInput.classList.add('expense-amount-input');
    amountInput.value = data[0].amount;

    let checkBoxContainer = document.createElement('div');
    checkBoxContainer.classList.add('check')

    let checkBoxInput = document.createElement('input');
    checkBoxInput.type = 'checkbox';
    checkBoxInput.classList.add('checked');
    checkBoxInput.checked = data[0].paid;

    let deleteButton = document.createElement('div');
    deleteButton.classList.add('delete');
    deleteButton.textContent = '❌';


    expenseContainer.appendChild(expenseInput);
    amountcontainer.appendChild(amountInput);
    checkBoxContainer.appendChild(checkBoxInput);
    userInputExpenses.append(expenseContainer, amountcontainer, checkBoxContainer, deleteButton);
    expenseInputcontainer.appendChild(userInputExpenses);

    let row = {};
    row.index = userInputExpenses.dataset.index;
    expenseInput.addEventListener('blur', () => {
        console.log(expenseInput.value)
        row.expense = expenseInput.value;
        console.log(row);
        saveToDatabase(row);
    })
    amountInput.addEventListener('blur', () => {
        row.amount = amountInput.value;
        console.log(row);
        saveToDatabase(row);
    })
    checkBoxInput.addEventListener('change', () => {
        row.isChecked = checkBoxInput.checked
        console.log(row);
        saveToDatabase(row);
    })

    deleteButton.addEventListener('click', (e) => {
        e.target.parentNode.remove();
    })
    userInputExpenses.addEventListener('mouseover', () => {
        deleteButton.style.visibility = 'visible';
    })

    userInputExpenses.addEventListener('mouseleave', () => {
        deleteButton.style.visibility = 'hidden';
    })
}

function saveToDatabase(row) {
    fetch('http://localhost:3000/write', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(row)
    })
    .then(res => res.json())
    .then(data => console.log('Saved:', data))
    .catch(err => console.error('Save error:', err));
}
