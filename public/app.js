console.log("JS Linked")

/********************GLOBAL VARIABLES********************/

const plusButton = document.getElementById("initial-add");
const expenseSection = document.querySelector(".section-two");




plusButton.addEventListener("click", () => {
    let newExpenseBar = `<div class="user-input-expenses">
    <div>
        <input type="text">
    </div>
    <div>
        <input type="text">
    </div>
    <div>
        <input type="text">
    </div>
    <div>
        <input type="text">
    </div>
    <div>
        <input type="text">
    </div>
    <div>
        <input type="text">
    </div>
</div>`
    plusButton.insertAdjacentHTML('beforebegin', newExpenseBar)

})