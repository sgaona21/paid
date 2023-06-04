console.log("JS Linked")

/////GLOBAL VARIABLES/////
const subs = document.getElementById("subs");
const monthlyExdpensesNav = document.getElementById("monthly-expenses-nav");
const totalDebt = document.getElementById("total-debt");


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
