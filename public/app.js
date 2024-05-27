console.log("JS Linked")

/********************GLOBAL VARIABLES********************/

const plusButton = document.getElementById("initial-add");
const expenseSection = document.querySelector(".section-two");
const expenseInputContainer = document.querySelector(".expense-input-container");
const expenseInput = document.querySelector(".expense-input");
const expenseAmountInput = document.querySelector(".expense-amount-input");
const userInputExpenses = document.querySelector(".user-input-expenses");






plusButton.addEventListener("click", () => {
    let newBar = document.createElement('div')
    newBar.className = "user-input-expenses";
    newBar.innerHTML = `<div>
                                <input type="text" class="expense-input">
                        </div>
                        <div>
                            <input type="text">
                        </div>
                        <div class="check">
                                <input type="checkbox" class="checked">
                        </div>`
    expenseInputContainer.appendChild(newBar)
});

expenseInput.addEventListener("input", () => {
        expenseInput.value = expenseInput.value.charAt(0).toUpperCase() + expenseInput.value.slice(1);
});

expenseAmountInput.addEventListener("focusout", () => {
        if (expenseAmountInput.value[0] !== "$") {
                expenseAmountInput.value = "$" + expenseAmountInput.value;
        } 
})





