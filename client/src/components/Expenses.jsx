import { useState } from "react";

import ExpenseRow from "./ExpenseRow";

const Expenses = () => {
  const [rows, setRows] = useState([
    { id: crypto.randomUUID(), name: "", amount: "", paid: false },
    { id: crypto.randomUUID(), name: "", amount: "", paid: false },
    { id: crypto.randomUUID(), name: "", amount: "", paid: false },
    { id: crypto.randomUUID(), name: "", amount: "", paid: false },
    { id: crypto.randomUUID(), name: "", amount: "", paid: false },
  ]);

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    const newRow = {
      id: crypto.randomUUID(),
      name: "",
      amount: "",
      paid: false,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const deleteRow = (idToDelete) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== idToDelete));
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

        {rows.map((row, index) => (
          <ExpenseRow
            key={row.id}
            row={row}
            index={index}
            deleteRow={() => deleteRow(row.id)}
            handleRowChange={handleRowChange}
          />
        ))}

        <div className="add-row" onClick={addRow}>
          +
        </div>
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