import { useState } from "react";

import ExpenseRow from "./ExpenseRow";

const Expenses = () => {
  const [rows, setRows] = useState([{ name: "", amount: "", paid: false }]);

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const total = rows.reduce(
    (sum, row) => sum + (parseFloat(row.amount) || 0),
    0
  );

  return (
    <div className="expense-content-container">

      <div className="expense-table-container">
        <ul className="expense-table-headers">
          <li>Expense</li>
          <li>Amount</li>
          <li>Paid</li>
        </ul>
        <ExpenseRow  handleRowChange={handleRowChange}/>
      </div>

     <div className="monthly-total-container">
        <div className="monthly-total-label">Total Expenses</div>
        <div className="monthly-total-amount">{total}</div>
      </div>

      <div className="monthly-remaining-container">
        <div className="monthly-remaining-label">Remaining Expenses</div>
        <div className="monthly-remaining-amount">0</div>
      </div>


    </div>
  );
};

export default Expenses;