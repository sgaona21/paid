import { useState, useContext, useEffect} from "react";


import ExpenseRow from "./ExpenseRow";
import UserContext from "../auth/UserContext";


const Expenses = () => {
  const context = useContext(UserContext);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [rows, setRows] = useState([]);

//   useEffect(() => {
//   const initExpenses = async () => {
//     const res = await fetch(`${API_BASE}/expense`);
//     const data = await res.json();

//     if (data.length === 0) {
//       const starterRows = createStarterRows();

//       setRows(starterRows);
//       await addStartersToDb(starterRows);
//     } else {
//       setRows(data);
//     }
//   };

//   initExpenses();
// }, []);

useEffect(() => {
  const init = async () => {
    const res = await fetch(`${API_BASE}/expense/seed`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    setRows(data);
  };

  init();
}, []);



function addStartersToDb(starterRows) {
  fetch(`${API_BASE}/expense/starters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(starterRows)
  })
}

  function createStarterRows() {
    return Array.from({ length: 10 }, () => ({
      clientId: crypto.randomUUID(),
      id: null,
      name: "",
      amount: null,
      paid: false,
      userId: context?.currentUser?.id,
    }));
  }

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    const newRow = {
      clientId: crypto.randomUUID(),
      id: null,
      name: "",
      amount: null,
      paid: false,
      userId: context?.currentUser?.id,
    };
    setRows((prevRows) => [...prevRows, newRow]);
    console.log(rows)
  };

  const deleteRow = (idToDelete) => {
    setRows((prevRows) => prevRows.filter((row) => row.clientId !== idToDelete));
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
            deleteRow={() => deleteRow(row.clientId)}
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