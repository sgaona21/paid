console.log("JS Linked")

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSc_JlrE5ojWvMSlE7upEBQqrJqV-7TZg",
  authDomain: "paid-2024.firebaseapp.com",
  projectId: "paid-2024",
  storageBucket: "paid-2024.firebasestorage.app",
  messagingSenderId: "596840912456",
  appId: "1:596840912456:web:07cd2c51a78f280fcb2a7d",
  measurementId: "G-JDM0RF1T98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Function to Add a Transaction
async function addTransaction(amount, type, category) {
  try {
    const docRef = await addDoc(collection(db, "transactions"), {
      amount: amount,
      type: type,
      category: category,
      timestamp: new Date()
    });
    console.log("Transaction added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
}
addTransaction(50, "expense", "Groceries");

console.log("Firebase initialized!");

// Function to Get Transactions
async function getTransactions() {
  const querySnapshot = await getDocs(collection(db, "transactions"));
  querySnapshot.forEach((doc) => {
    console.log(`Transaction ID: ${doc.id}, Data:`, doc.data());
  });
}

// Fetch and Display Transactions
getTransactions()



































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
