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
  deleteDoc,
  query,
  orderBy
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






class Expense {
        constructor(expense, amount, isChecked = false, id = null, order = null)  {
          this.expense = expense;
          this.amount = amount;
          this.isChecked = isChecked;
          this.id = id || crypto.randomUUID(); 
          this.order = order !== null ? order : Date.now();
        }

        renderExpenseRow() { 
                let expenseInputContainer = document.querySelector(".expense-input-container");
                
                let row = document.createElement("div");
                row.classList.add("user-input-expenses");

                // Create input elements
                let expenseDiv = document.createElement("div");
                expenseDiv.classList.add("expense");
                let expenseInput = document.createElement("input");
                expenseInput.classList.add("expense-input");
                expenseInput.type = "text";
                expenseInput.value = this.expense; // ✅ set value
                expenseDiv.appendChild(expenseInput);

                let amountDiv = document.createElement("div");
                amountDiv.classList.add("amount");
                let amountInput = document.createElement("input");
                amountInput.classList.add("expense-amount-input");
                amountInput.type = "text";
                amountInput.value = this.amount; // ✅ set value
                amountDiv.appendChild(amountInput);

                let checkDiv = document.createElement("div");
                checkDiv.classList.add("check");
                let checkInput = document.createElement("input");
                checkInput.classList.add("checked");
                checkInput.type = "checkbox";
                checkInput.checked = this.isChecked; // ✅ set checkbox state
                checkDiv.appendChild(checkInput);

                // Append all to row
                row.appendChild(expenseDiv);
                row.appendChild(amountDiv);
                row.appendChild(checkDiv);

                // Append row to container
                expenseInputContainer.appendChild(row);

                // Add event listeners
                expenseInput.addEventListener("blur", () => {
                  this.expense = expenseInput.value; 
                  this.saveExpenseRowToDatabase();
                });

                amountInput.addEventListener("blur", () => {
                  this.amount = amountInput.value;
                  this.saveExpenseRowToDatabase();
                });

                checkInput.addEventListener("change", () => {
                  this.isChecked = checkInput.checked;
                  this.saveExpenseRowToDatabase();
                });
        }

        async saveExpenseRowToDatabase() {
                const expenseData = {
                  id: this.id,               
                  order: this.order,        
                  expense: this.expense,
                  amount: this.amount,
                  isChecked: this.isChecked
                };
                await setDoc(doc(db, "expenses", this.id), expenseData);
              }

        // static async loadExpenseRowFromDatabase() {
        //     const querySnapshot = await getDocs(collection(db, "expenses"));
        //     querySnapshot.forEach((docSnap) => {
        //       const data = docSnap.data();
        //       const expense = new Expense(data.expense, data.amount, data.isChecked, docSnap.id);
        //       expense.renderExpenseRow();
        //     });
        //   }    
        static async loadExpenseRowFromDatabase() {
          const expensesQuery = query(collection(db, "expenses"), orderBy("order")); // <- Order by `order`
          const querySnapshot = await getDocs(expensesQuery);
      
          querySnapshot.forEach((docSnap) => {
              const data = docSnap.data();
              const expense = new Expense(data.expense, data.amount, data.isChecked, docSnap.id, data.order);
              expense.renderExpenseRow();
          });
      }
        

}        

let rowInitialization = new Expense("", "", false, null, null)
const expenseInputContainer = document.querySelector(".expense-input-container")


document.addEventListener("DOMContentLoaded", function () {
        Expense.loadExpenseRowFromDatabase().then(() => {
            if (expenseInputContainer.childElementCount == 0) {
                rowInitialization.renderExpenseRow();
            }
        });
    });
    

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", () => {
        rowInitialization.renderExpenseRow();
})




      