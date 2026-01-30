import { useState, useContext, useEffect} from "react";


import ExpenseRow from "./ExpenseRow";
import UserContext from "../auth/UserContext";


const Expenses = () => {
  const context = useContext(UserContext);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [rows, setRows] = useState([]);
  const [newExpense, setNewExpense] = useState({
    clientId: crypto.randomUUID(),
    name: '',
    amount: '',
    paid: false,
    userId: context?.currentUser?.id,
  }); 

  useEffect(() => {
    fetch(`${API_BASE}/expense`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        setRows(createStarterRows());
      } else {
        setRows(data);
      }
    })
  }, [])

  function createStarterRows() {
    return Array.from({ length: 3 }, () => ({
      clientId: crypto.randomUUID(),
      id: null,
      name: "",
      amount: "",
      paid: false,
    }));
  }


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
            key={row.clientId ?? row.id}
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