console.log("JS Linked")

/////GLOBAL VARIABLES/////
const subs = document.getElementById("subs");
const monthlyExdpensesNav = document.getElementById("monthly-expenses-nav");
const totalDebt = document.getElementById("total-debt");


subs.addEventListener("click", () => {
    subs.style.color = "aquamarine";
    subs.style.borderBottom = "solid 3px aquamarine";
    subs.style.position = "relative";
    subs.style.top = "3px";
})
