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

// TEST FUNCTION
function heyLOL() {
    console.log("hey LOL")
}

//******************** GLOBAL VARIABLES ********************//
const userInputExpenses = document.querySelector(".user-input-expenses");
const expenseInputContainer = document.querySelector(".expense-input-container")
const addButton = document.getElementById("add-button")








addButton.addEventListener("click", () => {
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




const menu = document.getElementById('customMenu');
let currentTarget = null;

document.addEventListener('contextmenu', function(e) {
  if (e.target.classList.contains("expense-amount-input") || e.target.classList.contains("expense-input") || e.target.classList.contains("check") ) {
    e.preventDefault();
    currentTarget = e.target;

    menu.style.display = 'block';
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
  } else {
    menu.style.display = 'none';
    currentTarget = null;
  }
});

menu.addEventListener('click', function() {
  if (currentTarget.classList.contains("check")) {
    currentTarget.parentElement.remove();
    currentTarget = null;
  } else if (currentTarget.classList.contains("expense-input") || currentTarget.classList.contains("expense-amount-input")) {
    currentTarget.parentElement.parentElement.remove();
  }
  menu.style.display = 'none';
});

document.addEventListener('click', function(e) {
  if (!menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});
