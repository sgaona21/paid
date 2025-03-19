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
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";




// Firebase config (already in your code)
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


function heyLOL() {
    console.log("hey LOL")
}

class Expense {
    constructor(name, amount, isPaid = false) {
      this.name = name;
      this.amount = amount;
      this.isPaid = isPaid;
    }
  
    createNewExpenseRow() {
        const row = document.createElement("div");
        row.className = "user-input-expenses";
        row.setAttribute("data-doc-id", this.docId || "unsaved");
    
        row.innerHTML = `
          <div><input type="text" class="expense-input" value="${this.name}"></div>
          <div><input type="text" class="expense-amount-input" value="${this.amount}"></div>
          <div class="check"><input type="checkbox" class="checked" ${this.isPaid ? "checked" : ""}></div>
          <div><button class="delete-expense-btn">🗑️</button></div>
        `;
    
        // Save reference to DOM element
        this.rowElement = row;
    
        // Add event listeners
        const nameInput = row.querySelector(".expense-input");
        const amountInput = row.querySelector(".expense-amount-input");
        const checkbox = row.querySelector(".checked");
        const deleteButton = row.querySelector(".delete-expense-btn");
    
        nameInput.addEventListener("input", async () => {
          this.name = nameInput.value;
          if (this.docId) {
            await updateDoc(doc(db, "expenses", this.docId), { name: this.name });
          }
        });
    
        amountInput.addEventListener("input", async () => {
          this.amount = amountInput.value;
          if (this.docId) {
            await updateDoc(doc(db, "expenses", this.docId), { amount: this.amount });
          }
        });
    
        checkbox.addEventListener("change", async () => {
          this.isPaid = checkbox.checked;
          if (this.docId) {
            await updateDoc(doc(db, "expenses", this.docId), { isPaid: this.isPaid });
          }
        });
    
        deleteButton.addEventListener("click", async () => {
          await this.deleteFromFirestore();
          this.rowElement.remove();
        });
    
        // Append to DOM
        expenseInputContainer.appendChild(row);
    }
  
    deleteExpense() {
      
    }

    loadFromFireStore() {

    }
  }
  





// DOM ELEMENTS
const expenseInput = document.querySelector(".expense-input");
const expenseAmount = document.querySelector(".expense-amount-input");
const checked = document.querySelector(".checked");
const expensesContainer = document.querySelector(".user-input-expenses")
const addButton = document.getElementById("add-button");
const expenseInputContainer = document.querySelector(".expense-input-container")


// Function to save input value to Firestore
const saveExpenseToFirestore = async () => {
    const expenseValue = expenseInput.value;
    const amountValue = expenseAmount.value;
    const checkStatus = checked.checked;
    
    try {
        await setDoc(doc(db, "expenses", "entry1"), {
            expense: expenseValue,
            amount: amountValue,
            isChecked: checkStatus
        });
        console.log("All expenses saved to Firestore:");
    } catch (error) {
        console.error("Error saving to Firestore:", error);
    }
};


// Function to retrieve saved value from Firestore
const loadExpenseFromFirestore = async () => {
    try {
        const docRef = doc(db, "expenses", "entry1");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            expenseInput.value = data.expense || "";
            expenseAmount.value = data.amount || "";
            checked.checked = data.isChecked || false;
            console.log("Expense data loaded from Firestore:", data);
        } else {
            console.log("No saved expense data found.");
        }
    } catch (error) {
        console.error("Error loading from Firestore:", error);
    }
};



// Load saved value from Firestore on page load
// window.addEventListener("DOMContentLoaded", loadExpenseFromFirestore);





// Save value to Firestore whenever input changes
expenseInput.addEventListener("input", saveExpenseToFirestore);
expenseAmount.addEventListener("input", saveExpenseToFirestore);
checked.addEventListener("change", saveExpenseToFirestore);






function addNewExpenseRow(expenseValue = "", amountValue = "", isChecked = false) {
    let newBar = document.createElement('div');
    newBar.className = "user-input-expenses";
    newBar.innerHTML = `
        <div><input type="text" class="expense-input" value="${expenseValue}"></div>
        <div><input type="text" class="expense-amount-input" value="${amountValue}"></div>
        <div class="check"><input type="checkbox" class="checked" ${isChecked ? "checked" : ""}></div>`;

    expenseInputContainer.appendChild(newBar);

    const newExpenseInput = newBar.querySelector('.expense-input');
    const newAmountInput = newBar.querySelector('.expense-amount-input');
    const newCheckbox = newBar.querySelector('.checked');

    // 🔥 Save to Firestore only once when the row is created
    const saveNewExpenseToFirestore = async () => {
        const expense = newExpenseInput.value;
        const amount = newAmountInput.value;
        const isChecked = newCheckbox.checked;

        try {
            const docRef = await addDoc(collection(db, "expenses"), {
                expense,
                amount,
                isChecked
            });
            console.log("New expense saved with ID:", docRef.id);

            // Store the document ID on the element for future updates
            newBar.setAttribute("data-doc-id", docRef.id);

            // Add listeners for live updates
            addUpdateListeners(docRef.id);
        } catch (error) {
            console.error("Error saving expense:", error);
        }
    };

    // 🔄 Add event listeners for updating Firestore when the inputs change
    const addUpdateListeners = (docId) => {
        const expenseRef = doc(db, "expenses", docId);

        newExpenseInput.addEventListener("input", async () => {
            try {
                await updateDoc(expenseRef, { expense: newExpenseInput.value });
            } catch (error) {
                console.error("Error updating expense name:", error);
            }
        });

        newAmountInput.addEventListener("input", async () => {
            try {
                await updateDoc(expenseRef, { amount: newAmountInput.value });
            } catch (error) {
                console.error("Error updating amount:", error);
            }
        });

        newCheckbox.addEventListener("change", async () => {
            try {
                await updateDoc(expenseRef, { isChecked: newCheckbox.checked });
            } catch (error) {
                console.error("Error updating checkbox:", error);
            }
        });
    };

    // Initial save when the row is added
    saveNewExpenseToFirestore();
}

const loadExpensesFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "expenses"));
  
      if (querySnapshot.empty) {
        console.log("No saved expense data found.");
        return;
      }
  
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        addNewExpenseRow(data.expense, data.amount, data.isChecked);
      });
  
      console.log("All expenses loaded from Firestore.");
    } catch (error) {
      console.error("Error loading expenses from Firestore:", error);
    }
  };


const loadEntry2FromFirestore = async () => {
    try {
        const docRef = doc(db, "expenses", "entry2");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            addNewExpenseRow(data.expense, data.amount, data.isChecked);
            console.log("Loaded entry2 from Firestore:", data);
        } else {
            console.log("No saved entry2 found.");
        }
    } catch (error) {
        console.error("Error loading entry2:", error);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    loadExpenseFromFirestore();  
    loadEntry2FromFirestore();     
});



// window.addEventListener("DOMContentLoaded", loadExpensesFromFirestore);


addButton.addEventListener("click", () => addNewExpenseRow());






