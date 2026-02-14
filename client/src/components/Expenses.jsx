import { useState, useContext, useEffect} from "react";
import ExpenseRow from "./ExpenseRow";
import UserContext from "../auth/UserContext";


const Expenses = () => {
  const context = useContext(UserContext);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    updateUI();
  }, []);

  const updateUI = async () => {
    try {
      const res = await fetch(`${API_BASE}/expense`, {
        credentials: "include",
      });

      if (!res.ok) {
        console.warn("updateUI failed:", res.status);
        return;
      }

      const data = await res.json();
      setRows(data);
    } catch (err) {
      console.error("updateUI crashed:", err);
    }
  };

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
      isPaid: false,
      userId: context?.currentUser?.id,
    };
    setRows((prevRows) => [...prevRows, newRow]);
    addRowToDb(newRow);
  };

  const addRowToDb = async (row) => {
    await fetch(`${API_BASE}/expense/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    updateUI();
  };

  async function saveRowToDb(row) {
    const res = await fetch(`${API_BASE}/expense/${row.id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: row.name,
        amount: row.amount,
        isPaid: row.isPaid,
      }),
    });

    if (!res.ok) {
      console.warn("Save failed:", res.status);
      return;
    }

    updateUI();
  }

  const deleteRow = (idToDelete) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== idToDelete));
    deleteRowFromDb(idToDelete);
  };

  async function deleteRowFromDb(rowId) {
    try {
      const res = await fetch(`${API_BASE}/expense/${rowId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.warn("Delete failed:", res.status);
        return;
      }

      updateUI();
    } catch (err) {
      console.error("deleteRowFromDb crashed:", err);
    }
  }

  const total = rows.reduce(
    (sum, row) => sum + (parseFloat(row.amount) || 0),
    0,
  );

  const totalPaid = rows.reduce((sum, row) => {
    if (!row.isPaid) return sum;

    const amount = parseFloat(row.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

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
            saveRow={saveRowToDb}
          />
        ))}

        
      </div>
      <div className="add-row" onClick={addRow}>
          +
        </div>

      <div className="monthly-total-container">
        <div className="monthly-total-label">Total Expenses</div>
        <div className="monthly-total-amount">{total}</div>
      </div>

      <div className="monthly-remaining-container">
        <div className="monthly-remaining-label">Remaining Expenses</div>
        <div className="monthly-remaining-amount">{total - totalPaid}</div>
      </div>
    </div>
  );
};

export default Expenses;