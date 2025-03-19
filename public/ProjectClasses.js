class myTestClass {
    constructor(make, model) {
        this.make = make;
        this.model = model
    }
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



