import { useState, useContext, useEffect, useRef } from "react";
import ExpenseRow from "./ExpenseRow";
import SheetOverlay from "./SheetOverlay.jsx";
import UserContext from "../auth/UserContext";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Bar } from 'react-chartjs-2';
import { sheets as mockSheets } from './mockData'
import { mockExpenses as mockData } from './mockExpenses';
import hamburger from '../assets/hamburger.png';
import rightArrow from '../assets/right-arrow.png';
import spinner from '../assets/spinner2.png';

console.log(mockData.sheets)

const Expenses = () => {
  const context = useContext(UserContext);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [rows, setRows] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSheet, setCurrentSheet] = useState("");
  const [sheetOverlayVisible, setSheetOverlayVisible] = useState(false);
  const [sheetMenuVisible, setSheetMenuVisible] = useState(false);
  const [isRenamingSheet, setIsRenamingSheet] = useState(false);
  const [draftSheetLabel, setDraftSheetLabel] = useState("");
  const [userExpenseData, setUserExpenseData] = useState({
    sheets: [],
    expenses: [],
  });

  useEffect(() => {
    updateUI();
    // updateSheets();
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

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setUserExpenseData(mockData);

      if (!currentSheet && mockData?.sheets?.length) {
        setCurrentSheet(mockData.sheets[0]);
      }
      setIsLoading(false)
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // const handleRowChange = (index, field, value) => {
  //   const updated = [...rows];
  //   updated[index][field] = value;
  //   setRows(updated);
  // };

//   const handleRowChange = (rowKey, field, value) => {
//   setUserExpenseData((prev) => ({
//     ...prev,
//     expenses: prev.expenses.map((e) => {
//       const key = e.clientId ?? e.id;
//       return key === rowKey ? { ...e, [field]: value } : e;
//     }),
//   }));
// };

function handleRowChange(rowId, field, value) {
  setUserExpenseData(prev => ({
    ...prev,
    expenses: prev.expenses.map(e =>
      (e.id ?? e.clientId) === rowId ? { ...e, [field]: value } : e
    )
  }));
}


  // const addRow = () => {
  //   const newRow = {
  //     clientId: crypto.randomUUID(),
  //     id: null,
  //     name: "",
  //     amount: null,
  //     isPaid: false,
  //     userId: context?.currentUser?.id,
  //   };
  //   setRows((prevRows) => [...prevRows, newRow]);
  //   addRowToDb(newRow);
  // };

function addRow(newRow) {
  const rowWithSheet = {
    ...newRow,
    id: null,
    sheetId: currentSheet.id,
    clientId: crypto.randomUUID(),
    userId: context?.currentUser?.id
  };

  setUserExpenseData((prev) => ({
    ...prev,
    expenses: [...prev.expenses, rowWithSheet],
  }));
}

function addSheet() {
  const newSheet = {
    id: null,
    clientId: crypto.randomUUID(),
    label: "New Sheet",
    netIncome: null
  };

  setUserExpenseData((prev) => ({
    ...prev,
    sheets: [...prev.sheets, newSheet],
  }));

}

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

  // const deleteRow = (idToDelete) => {
  //   setRows((prevRows) => prevRows.filter((row) => row.id !== idToDelete));
  //   deleteRowFromDb(idToDelete);
  // };

  function deleteRow(rowId) {
    setUserExpenseData((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => (e.id ?? e.clientId) !== rowId),
    }));
  }

const handleNetIncomeChange = (value) => {
  setCurrentSheet((prev) => ({ ...prev, netIncome: value }));

  setUserExpenseData((prev) => ({
    ...prev,
    sheets: prev.sheets.map((sheet) =>
      sheet.id === currentSheet.id ? { ...sheet, netIncome: value } : sheet
    ),
  }));
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

  function toggleSheetOverlay() {
      setSheetOverlayVisible(prev => !prev);
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

  function startRename() {
    setIsRenamingSheet(true);
    setDraftSheetLabel(currentSheet.label);
    setSheetMenuVisible((v) => !v);
  }

// function saveRename() {
//   const next = draftSheetLabel.trim();
//   if (!next) return;

//   setCurrentSheet((prev) => ({ ...prev, label: next }));

//   setUserExpenseData((prev) => ({
//     ...prev,
//     sheets: prev.sheets.map((s) =>
//       s.id === currentSheet.id ? { ...s, label: next } : s
//     ),
//   }));

//   setIsRenamingSheet(false);
// }

function saveRename() {
  const next = draftSheetLabel.trim();
  if (!next) return;

  const currentKey = currentSheet.id ?? currentSheet.clientId;

  setCurrentSheet((prev) => ({ ...prev, label: next }));

  setUserExpenseData((prev) => ({
    ...prev,
    sheets: prev.sheets.map((s) => {
      const sheetKey = s.id ?? s.clientId;
      return sheetKey === currentKey ? { ...s, label: next } : s;
    }),
  }));

  setIsRenamingSheet(false);
}


function deleteSheet(sheetIdToDelete) {
  if (userExpenseData.sheets.length <= 1) return;
  setUserExpenseData((prev) => {
    const remainingSheets = prev.sheets.filter((s) => (s.id ?? s.clientId) !== sheetIdToDelete);
    const remainingExpenses = prev.expenses.filter((e) => (e.id ?? e.clientId) !== sheetIdToDelete);

    if ((currentSheet?.id ?? currentSheet?.clientId) === sheetIdToDelete) {
      const nextSheet = remainingSheets[0] ?? null;
      setCurrentSheet(nextSheet);
    }

    return {
      ...prev,
      sheets: remainingSheets,
      expenses: remainingExpenses,
    };
  });
}


  if (isLoading) {
    return (
      <div className="spinner"><img src={spinner} alt="loading spinner" /></div>
    )
  }

  return (
    <div className="expense-content-container">
      <div className="expense-table-container">
        <ul className="expense-table-headers">
          <li>Expense</li>
          <li>Amount</li>
          <li>Paid</li>
        </ul>

        {/* {rows.map((row, index) => (
          <ExpenseRow
            key={row.clientId ?? row.id}
            row={row}
            index={index}
            deleteRow={() => deleteRow(row.id)}
            handleRowChange={handleRowChange}
            saveRow={saveRowToDb}
          />
        ))} */}

        {/* {userExpenseData.expenses.map((row, index) => (
          <ExpenseRow
            key={row.clientId ?? row.id}
            row={row}
            index={index}
            deleteRow={() => deleteRow(row.id)}
            handleRowChange={handleRowChange}
            saveRow={saveRowToDb}
          />
        ))} */}

        {userExpenseData.expenses
          .filter((expense) => expense.sheetId === currentSheet.id)
          .map((row, index) => (
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

      <div className="net-monthly-container">
        <div className="monthly-total-label">Net Monthly Income</div>
        <div className="net-total-container">
          <input
            type="number"
            name="net-total"
            value={currentSheet.netIncome ?? ""}
            onChange={(e) => handleNetIncomeChange(e.target.value)}
            // onBlur={}
          ></input>
        </div>
      </div>

      <div className="monthly-total-container">
        <div className="monthly-total-label">Total Expenses</div>
        <div className="monthly-total-amount">{total}</div>
      </div>

      <div className="monthly-remaining-container">
        <div className="monthly-remaining-label">Remaining Expenses</div>
        <div className="monthly-remaining-amount">{total - totalPaid}</div>
        <div className="remaining-expense-donut">
          <Doughnut
            data={{
              labels: ["Total Expenses", "Remaining Expenses"],
              datasets: [
                {
                  label: "Exp",
                  data: [`${total}`, `${totalPaid}`],
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="monthly-total-container">
        <div className="monthly-total-label">Expendable Income</div>
        <div className="monthly-total-amount">{total}</div>
        <div className="remaining-expense-donut">
          <Bar
            data={{
              labels: ["Total Expenses", "Remaining Expenses"],
              datasets: [
                {
                  label: "Exp",
                  data: [`${total}`, `${totalPaid}`],
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="sheets-container">
        <div className="add-sheet-container">
          <div
            className="hamburger-sheets-container"
            onClick={toggleSheetOverlay}
          >
            <img
              src={hamburger}
              alt="hamburger menu for mobile sheet options"
            />
          </div>
        </div>

        <div className="current-sheet-mobile">
          {/* <div className="sheet-label">{currentSheet.label}</div> */}

          <div className="sheet-label">
            {isRenamingSheet ? (
              <input
                className="sheet-label-input"
                value={draftSheetLabel}
                onChange={(e) => setDraftSheetLabel(e.target.value)}
                autoFocus
                onBlur={saveRename}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveRename();
                }}
              />
            ) : (
              currentSheet.label
            )}
          </div>

          <div
            className={`sheet-arrow-container ${sheetMenuVisible ? "rotated" : ""}`}
            onClick={() => setSheetMenuVisible((v) => !v)}
          >
            <img src={rightArrow} alt="right arrow" />
          </div>
        </div>

        <div className={`sheet-menu ${sheetMenuVisible ? "show" : ""}`}>
          <div className="rename-sheet" onClick={() => startRename()}>
            Rename
          </div>
          <div
            className="delete-sheet"
            onClick={() => {
              deleteSheet(currentSheet.id ?? currentSheet.clientId);
              setSheetMenuVisible((prev) => !prev);
            }}
          >
            Delete
          </div>
        </div>
      </div>

      <SheetOverlay
        userExpenseData={userExpenseData}
        toggleSheetOverlay={toggleSheetOverlay}
        currentSheet={currentSheet}
        setCurrentSheet={setCurrentSheet}
        setSheetOverlayVisible={setSheetOverlayVisible}
        sheetOverlayVisible={sheetOverlayVisible}
        addSheet={addSheet}
      />
    </div>
  );
};

export default Expenses;
