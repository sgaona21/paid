console.log("JS Linked")





/******************** GLOBAL VARIABLES ********************/

const plusButton = document.getElementById("initial-add");
const expenseSection = document.querySelector(".section-two");
const expenseInput = document.querySelector(".expense-input");
const expenseInputContainer = document.querySelector(".expense-input-container");
const expenseAmountInput = document.querySelector(".expense-amount-input");
const userInputExpenses = document.querySelector(".user-input-expenses");





/******************* MAIN EXPENSE TABLE ******************/

plusButton.addEventListener("click", () => {
    let newBar = document.createElement('div');
    newBar.className = "user-input-expenses";
    newBar.innerHTML = `<div>
                                <input type="text" class="expense-input">
                        </div>
                        <div>
                            <input type="text" class="expense-amount-input">
                        </div>
                        <div class="check">
                                <input type="checkbox" class="checked">
                        </div>`
    expenseInputContainer.appendChild(newBar)
});

expenseInputContainer.addEventListener("focusout", () => {
        if (event.target.className === "expense-input") {
                console.log("this has focused out")
                event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
        }
});

expenseInputContainer.addEventListener("focusout", () => {
        if (event.target.className === "expense-amount-input") {

        if (event.target.value[0] !== "$") {
                event.target.value = "$" + event.target.value;
        } 
        }
});
