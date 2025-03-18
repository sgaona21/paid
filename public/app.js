// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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






// Reference to input field
const expenseInput = document.querySelector(".expense-input");
const expenseAmount = document.querySelector(".expense-amount-input");
const paidCheckbox = document.getElementById("paid-checkbox");
const expensesContainer = document.querySelector(".user-input-expenses")

// Function to save input value to Firestore
const saveExpenseToFirestore = async () => {
    const expenseValue = expenseInput.value;
    const amountValue = expenseAmount.value;
    const checkStatus = paidCheckbox.checked;
    
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
            paidCheckbox.checked = data.isChecked || false;
            console.log("Expense data loaded from Firestore:", data);
        } else {
            console.log("No saved expense data found.");
        }
    } catch (error) {
        console.error("Error loading from Firestore:", error);
    }
};



// Load saved value from Firestore on page load
window.addEventListener("DOMContentLoaded", loadExpenseFromFirestore);


// Save value to Firestore whenever input changes
expenseInput.addEventListener("input", saveExpenseToFirestore);
expenseAmount.addEventListener("input", saveExpenseToFirestore);
paidCheckbox.addEventListener("change", saveExpenseToFirestore);







