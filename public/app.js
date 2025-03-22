// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase config 
const firebaseConfig = {
    apiKey: "AIzaSyCSc_JlrE5ojWvMSlE7upEBQqrJqV-7TZg",
    authDomain: "paid-2024.firebaseapp.com",
    projectId: "paid-2024",
    storageBucket: "paid-2024.appspot.com",
    messagingSenderId: "596840912456",
    appId: "1:596840912456:web:07cd2c51a78f280fcb2a7d",
    measurementId: "G-JDM0RF1T98"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// TEST FUNCTION
function heyLOL() {
    console.log("hey LOL")
}

//******************** GLOBAL VARIABLES ********************//
const userInputExpenses = document.querySelector(".user-input-expenses");
const expenseInputContainer = document.querySelector(".expense-input-container")
const addButton = document.getElementById("add-button")
const menu = document.getElementById('customMenu');
const totalMonthlyAmount = document.querySelector(".total-monthly-amount")

class Expense {
  constructor(expense, amount, isChecked = false, id = null) {
    this.expense = expense;
    this.amount = amount;
    this.isChecked = isChecked;
    this.id = id || crypto.randomUUID(); 
  }

  renderExpenseRow() {
    const row = document.createElement("div");
    row.className = "user-input-expenses";
    row.setAttribute("data-id", this.id);

    row.innerHTML = `
      <div><input type="text" class="expense-input" value="${this.expense}"></div>
      <div><input type="text" class="expense-amount-input" value="${this.amount}"></div>
      <div class="check"><input type="checkbox" class="checked" ${this.isChecked ? "checked" : ""}></div>
    `;

    // Save to DB on input change
    row.querySelector(".expense-input").addEventListener("input", (e) => {
      this.expense = e.target.value;
      this.saveExpenseRowToDatabase();

      const expenseInput = document.querySelector(".expense-input");
      const expenseAmountInput = document.querySelector(".expense-amount-input")
      expenseAmountInput.addEventListener('blur', calculateMonthlyExpenseSum())
      expenseInput.addEventListener('blur', calculateMonthlyExpenseSum())
    });

    row.querySelector(".expense-amount-input").addEventListener("input", (e) => {
      this.amount = e.target.value;
      this.saveExpenseRowToDatabase();
      const expenseInput = document.querySelector(".expense-input");
      const expenseAmountInput = document.querySelector(".expense-amount-input")
      expenseAmountInput.addEventListener('blur', calculateMonthlyExpenseSum())
      expenseInput.addEventListener('blur', calculateMonthlyExpenseSum())
    });

    row.querySelector(".checked").addEventListener("change", (e) => {
      this.isChecked = e.target.checked;
      this.saveExpenseRowToDatabase();
    });

    // Right-click delete setup
    this.setupDeleteMenu(row);

    expenseInputContainer.appendChild(row);
  }

  setupDeleteMenu(rowElement) {
    let currentTarget = null;

    rowElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      currentTarget = rowElement;
      menu.style.display = 'block';
      menu.style.left = `${e.pageX}px`;
      menu.style.top = `${e.pageY}px`;
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) {
        menu.style.display = "none";
      }
    });

    menu.addEventListener("click", async () => {
      if (currentTarget) {
        await deleteDoc(doc(db, "expenses", this.id));
        currentTarget.remove();
        menu.style.display = "none";
      }
    });
  }

  async saveExpenseRowToDatabase() {
    const expenseData = {
      expense: this.expense,
      amount: this.amount,
      isChecked: this.isChecked
    };

    await setDoc(doc(db, "expenses", this.id), expenseData);
  }

  static async loadExpenseValuesFromDatabase() {
    const querySnapshot = await getDocs(collection(db, "expenses"));
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const expense = new Expense(data.expense, data.amount, data.isChecked, docSnap.id);
      expense.renderExpenseRow();
    });
  }
}

// Load expenses on page load
window.addEventListener("DOMContentLoaded", () => {
  Expense.loadExpenseValuesFromDatabase();
});


// Add new row button
addButton.addEventListener("click", () => {
  const newExpense = new Expense("", "", false);
  newExpense.renderExpenseRow();
  newExpense.saveExpenseRowToDatabase();
});


function calculateMonthlyExpenseSum() {
  let allAmountValues = document.querySelectorAll(".expense-amount-input");
  let sum = 0;
  for (let i = 0; i < allAmountValues.length; i++) {
    let numberToAdd = parseInt(allAmountValues[i].value)
    sum += numberToAdd;
  }
  totalMonthlyAmount.innerHTML = sum;
}


