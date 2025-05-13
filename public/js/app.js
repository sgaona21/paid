const expenseInputcontainer = document.querySelector('.expense-input-container');
const addButton = document.getElementById('add-button');
let rowTemplate = {"index": null, "expense": '', "amount": '', "isPaid": false}
const totalMonthlyAmount = document.querySelector('.total-monthly-amount');
const remainingAmount = document.querySelector('.remaining-amount');

function createNewExpenserow() {
    let newRow = {"index": null, "expense": '', "amount": '', "isPaid": false}
    let currentNumberOfChildren = expenseInputcontainer.children.length;

    let userInputExpenses = document.createElement('div');
    userInputExpenses.classList.add('user-input-expenses');
    userInputExpenses.dataset.index = Number(currentNumberOfChildren + 1);
    newRow.index = Number(userInputExpenses.dataset.index)
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

    

        userInputExpenses.addEventListener('focusout', (e) => {
            let updatedRow = { ...rowTemplate };
            updatedRow.index = Number(e.target.parentNode.parentNode.dataset.index);
            updatedRow.expense = expenseInput.value;
            if (amountInput.value != '') {
                updatedRow.amount = Number(amountInput.value);
            }
            updatedRow.isPaid = checkBoxInput.checked;
        fetch('/update-row', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRow)
        });
        monthlySum();
        monthlyRemaining();
        })

    deleteButton.addEventListener('click', (e) => {
            let deletedIndex = e.target.parentNode.dataset.index;
            e.target.parentNode.remove();

            for (let i = 0; i < expenseInputcontainer.children.length; i++) {
                expenseInputcontainer.children[i].dataset.index = i + 1;
            }
            
            fetch('/index', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({ deletedIndex })
            });
            monthlySum();
            monthlyRemaining();
        })


    userInputExpenses.addEventListener('mouseover', () => {
        deleteButton.style.visibility = 'visible';
    })

    userInputExpenses.addEventListener('mouseleave', () => {
        deleteButton.style.visibility = 'hidden';
    })

    checkBoxInput.addEventListener('change', () => {
        monthlyRemaining();
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



fetch('/data')
.then(response => response.json())
.then(data => console.log(data.length))



fetch('/data')
  .then(response => response.json())
  .then(data => {
    sortByIndex(data)
    loadFromPoorDatabase(data)
    monthlySum();
    monthlyRemaining()
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
            e.target.parentNode.remove();

            for (let i = 0; i < expenseInputcontainer.children.length; i++) {
                expenseInputcontainer.children[i].dataset.index = i + 1;
            }
            fetch('/index', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({ deletedIndex })
            });
            monthlySum();
            monthlyRemaining();
            
        })

        userInputExpenses.addEventListener('mouseover', () => {
            deleteButton.style.visibility = 'visible';
        })

        userInputExpenses.addEventListener('mouseleave', () => {
            deleteButton.style.visibility = 'hidden';
        })

        checkBoxInput.addEventListener('change', () => {
            monthlyRemaining();
        })

        let rowTemplate = {"index": null, "expense": '', "amount": '', "isPaid": false}
        
        userInputExpenses.addEventListener('focusout', (e) => {
            let updatedRow = { ...rowTemplate };
            updatedRow.index = Number(e.target.parentNode.parentNode.dataset.index);
            updatedRow.expense = expenseInput.value;
            if (amountInput.value != '') {
                updatedRow.amount = Number(amountInput.value);
            }
            updatedRow.isPaid = checkBoxInput.checked;
        fetch('/update-row', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRow)
        });
        monthlySum();
        monthlyRemaining();
        })
    }
}

function sortByIndex(expenses) {
    return expenses.sort((a, b) => a.index - b.index);
}


function monthlySum() {
    const amountInputs = document.querySelectorAll('.expense-amount-input');
    let sum = 0;

    amountInputs.forEach(input => {
        sum += Number(input.value);
    });

    totalMonthlyAmount.textContent = '$' + sum;
    return sum;
}

function monthlyRemaining() {
    let total = monthlySum();
    let rows = document.querySelectorAll('.expense-input-container');
    let checkboxes = rows[0].querySelectorAll('.checked');
    let amountInputs = rows[0].querySelectorAll('.expense-amount-input')
    let totalPaid = 0;

    rows.forEach(row => {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                totalPaid += Number(amountInputs[i].value)
            }
        }
    })
    let difference = total - totalPaid;
    remainingAmount.textContent = '$' + difference;
    return difference;
}


