console.log("JS Linked")

/********************GLOBAL VARIABLES********************/

const plusButton = document.getElementById("initial-add");
const expenseSection = document.querySelector(".section-two");
const expenseInputContainer = document.querySelector(".expense-input-container");


console.log(expenseInputContainer.textContent)

plusButton.addEventListener("click", () => {
    let newBar = document.createElement('div')
    newBar.className = "user-input-expenses";
    newBar.innerHTML = `<div>
                                <input type="text">
                        </div>
                        <div>
                            <input type="text">
                        </div>
                        <div class="check">
                                <input type="checkbox" class="checked">
                        </div>`
    expenseInputContainer.appendChild(newBar)
});

