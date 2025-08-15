import ExpenseRow from "./ExpenseRow";

const Expenses = () => {
  return (
    <div className="expense-content-container">

      <div className="expense-table-container">
        <ul className="expense-table-headers">
          <li>Expense</li>
          <li>Amount</li>
          <li>Paid</li>
        </ul>
        <ExpenseRow />
      </div>

     <div className="monthly-total-container">
        <div className="monthly-total-label">Total Expenses</div>
        <div className="monthly-total-amount">0</div>
      </div>

      <div className="monthly-remaining-container">
        <div className="monthly-remaining-label">Remaining Expenses</div>
        <div className="monthly-remaining-amount">0</div>
      </div>

     


    </div>
  );
};

export default Expenses;