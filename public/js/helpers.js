// **************** FUNCTIONS ***************** // 

async function loadData() {
  try {
    const response = await fetch('/data');
    data = await response.json();

    sortByIndex(data);
    loadFromDB(data);
    monthlySum();
    monthlyRemaining();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

function loadFromDB(dbData) {
    dbData.forEach(item => {
        renderExpenseRow(item);
    })
}

function renderExpenseRow(template) {
    let newRow = structuredClone(template);
    let currentNumberOfChildren = expenseInputcontainer.children.length;

    let userInputExpenses = document.createElement('div');
    userInputExpenses.classList.add('user-input-expenses');
    userInputExpenses.dataset.index = Number(currentNumberOfChildren + 1);
    newRow.index = Number(userInputExpenses.dataset.index);

    let expenseContainer = document.createElement('div');
    
    let expenseInput = document.createElement('input');
    expenseInput.type = 'text';
    expenseInput.classList.add('expense-input');
    expenseInput.value = template.expense || '';

    let amountcontainer = document.createElement('div');
    amountcontainer.classList.add('amount');

    let amountInput = document.createElement('input');
    amountInput.type = 'text';
    amountInput.classList.add('expense-amount-input');
    amountInput.value = template.amount || '';

    let checkBoxContainer = document.createElement('div');
    checkBoxContainer.classList.add('check')
    let checkBoxInput = document.createElement('input');
    checkBoxInput.type = 'checkbox';
    checkBoxInput.classList.add('checked');
    checkBoxInput.checked = template.isPaid || false;

    let deleteButton = document.createElement('div');
    deleteButton.classList.add('delete');
    deleteButton.textContent = '❌';

    expenseContainer.appendChild(expenseInput);
    amountcontainer.appendChild(amountInput);
    checkBoxContainer.appendChild(checkBoxInput);
    userInputExpenses.append(expenseContainer, amountcontainer, checkBoxContainer, deleteButton);
    expenseInputcontainer.appendChild(userInputExpenses);

    userInputExpenses.addEventListener('focusout', (e) => {
        let updatedRow = structuredClone(rowTemplate);
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

    userInputExpenses.addEventListener('change', (e) => {
        let updatedRow = structuredClone(rowTemplate);
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

    return newRow
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
    let amountInputs = rows[0].querySelectorAll('.expense-amount-input');
    let totalPaid = 0;

    rows.forEach(row => {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                totalPaid += Number(amountInputs[i].value);
            }
        }
    })
    let difference = total - totalPaid;
    remainingAmount.textContent = '$' + difference;
    return difference;
}

