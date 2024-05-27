console.log("JS Linked")

/********************GLOBAL VARIABLES********************/

const plusButton = document.getElementById("initial-add");
const expenseSection = document.querySelector(".section-two");
const expenseInputContainer = document.querySelector(".expense-input-container");
const expenseInput = document.querySelector(".expense-input");


const stringer = "hello";
console.log(stringer[0].toUpperCase())

console.log(expenseInputContainer.textContent)

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
})
