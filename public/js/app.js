const expenseInputcontainer = document.querySelector('.expense-input-container');
const addButton = document.getElementById('add-button');
let rowTemplate = {"index": null, "expense": '', "amount": '', "isPaid": false}

function createNewExpenserow() {
    let newRow = {"index": null, "expense": '', "amount": '', "isPaid": false}
    console.log(expenseInputcontainer.children.length)
    let currentNumberOfChildren = expenseInputcontainer.children.length;

    let userInputExpenses = document.createElement('div');
    userInputExpenses.classList.add('user-input-expenses');
    userInputExpenses.dataset.index = Number(currentNumberOfChildren + 1);
    console.log('new data set index: ' + userInputExpenses.dataset.index);
    newRow.index = Number(currentNumberOfChildren + 1);
    console.log(newRow)

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

    

        userInputExpenses.addEventListener('input', (e) => {
            let updatedRow = { ...rowTemplate };

            console.log(updatedRow)
            updatedRow.index = Number(e.target.parentNode.parentNode.dataset.index);
            updatedRow.expense = expenseInput.value;
            updatedRow.amount = Number(amountInput.value);
            updatedRow.isPaid = checkBoxInput.checked;
            console.log(updatedRow)
        fetch('/update-row', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRow)
        });
        })

    deleteButton.addEventListener('click', (e) => {
            let deletedIndex = e.target.parentNode.dataset.index;
            console.log('deleted index: ', deletedIndex);
            e.target.parentNode.remove();
            fetch('/index', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({ deletedIndex })
            });
            
        })


    userInputExpenses.addEventListener('mouseover', () => {
        deleteButton.style.visibility = 'visible';
    })

    userInputExpenses.addEventListener('mouseleave', () => {
        deleteButton.style.visibility = 'hidden';
    })

    addButton.addEventListener('click', () => {
        
    });

    return newRow
}

addButton.addEventListener('click', () => {
    let brandNewRow = createNewExpenserow();

    fetch('/new-row', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(brandNewRow)
        });

});


fetch('/data.txt')
.then(response => response.json())
.then(data => console.log(data.length))



fetch('/data.txt')
  .then(response => response.json())
  .then(data => {
    sortByIndex(data)
    loadFromPoorDatabase(data)
  });



function loadFromPoorDatabase(data) {

    for (let i = 0; i < data.length; i++) {
        let userInputExpenses = document.createElement('div');
        userInputExpenses.classList.add('user-input-expenses');
        userInputExpenses.dataset.index = data[i].index

        let expenseContainer = document.createElement('div');
        
        let expenseInput = document.createElement('input');
        expenseInput.type = 'text';
        expenseInput.classList.add('expense-input');
        expenseInput.value = data[i].expense;

        let amountcontainer = document.createElement('div');
        amountcontainer.classList.add('amount');

        let amountInput = document.createElement('input');
        amountInput.type = 'text';
        amountInput.classList.add('expense-amount-input');
        amountInput.value = data[i].amount;

        let checkBoxContainer = document.createElement('div');
        checkBoxContainer.classList.add('check')

        let checkBoxInput = document.createElement('input');
        checkBoxInput.type = 'checkbox';
        checkBoxInput.classList.add('checked');
        checkBoxInput.checked = data[i].isPaid;

        let deleteButton = document.createElement('div');
        deleteButton.classList.add('delete');
        deleteButton.textContent = '❌';


        expenseContainer.appendChild(expenseInput);
        amountcontainer.appendChild(amountInput);
        checkBoxContainer.appendChild(checkBoxInput);
        userInputExpenses.append(expenseContainer, amountcontainer, checkBoxContainer, deleteButton);
        expenseInputcontainer.appendChild(userInputExpenses);

        deleteButton.addEventListener('click', (e) => {
            let deletedIndex = e.target.parentNode.dataset.index;
            console.log('deleted index: ', deletedIndex);
            e.target.parentNode.remove();
            fetch('/index', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({ deletedIndex })
            });
            
        })

        userInputExpenses.addEventListener('mouseover', () => {
            deleteButton.style.visibility = 'visible';
        })

        userInputExpenses.addEventListener('mouseleave', () => {
            deleteButton.style.visibility = 'hidden';
        })

        let rowTemplate = {"index": null, "expense": '', "amount": '', "isPaid": false}
        userInputExpenses.addEventListener('input', (e) => {
            let updatedRow = { ...rowTemplate };
            console.log(updatedRow)
            updatedRow.index = Number(e.target.parentNode.parentNode.dataset.index);
            updatedRow.expense = expenseInput.value;
            updatedRow.amount = Number(amountInput.value);
            updatedRow.isPaid = checkBoxInput.checked;
            console.log(updatedRow)
        fetch('/update-row', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRow)
        });
        })

    }
    
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

function sortByIndex(expenses) {
    return expenses.sort((a, b) => a.index - b.index);
}
