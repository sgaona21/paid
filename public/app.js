console.log("JS Linked")

/////GLOBAL VARIABLES/////
const subs = document.getElementById("subs");
const monthlyExdpensesNav = document.getElementById("monthly-expenses-nav");
const totalDebt = document.getElementById("total-debt");
const expenseList = document.querySelector(".expense-list");
const addExpense = document.querySelector(".add-expense");





subs.addEventListener("click", () => {
    if (subs.style.color = "white") {
    subs.style.color = "aquamarine";
    subs.style.borderBottom = "solid 3px aquamarine";
    subs.style.position = "relative";
    subs.style.top = "3px";
    } else {
        subs.style.color = "white";
        subs.style.borderBottom = "solid 3px white";
        subs.style.position = "relative";
        subs.style.top = "3px";
    }
})

subs.addEventListener("click", () => {
    if (subs.style.color === "aquamarine") {
        subs.style.color = "white";
    }
})

addExpense.addEventListener("click", () => {
    let newLi = document.createElement('li');
    newLi.className = "add-expense";
    let newExpense = document.createElement("input");
    newExpense.type = "text";
    newLi.appendChild(newExpense);
    expenseList.insertBefore(newLi, addExpense);
    newExpense.focus();
});
