import { useState, useContext, useEffect, useRef } from "react";
import ExpenseRow from "./ExpenseRow";
import SheetOverlay from "./SheetOverlay.jsx";
import UserContext from "../auth/UserContext";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import { sheets as mockSheets } from "./mockData";
import { mockExpenses as mockData } from "./mockExpenses";
import hamburger from "../assets/hamburger.png";
import rightArrow from "../assets/right-arrow.png";
import spinner from "../assets/spinner2.png";
import Sheets from "./Sheets.jsx";
import Sheet from "./Sheet.jsx";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";

const Expenses = () => {
  const context = useContext(UserContext);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSheet, setCurrentSheet] = useState("");
  const [sheetOverlayVisible, setSheetOverlayVisible] = useState(false);
  const [sheetMenuOverlayVisible, setSheetMenuOverlayVisible] = useState(false);
  const [sheetMenuVisible, setSheetMenuVisible] = useState(false);
  const [isRenamingSheet, setIsRenamingSheet] = useState(false);
  const [renamingSheetId, setRenamingSheetId] = useState(null);
  const [draftSheetLabel, setDraftSheetLabel] = useState("");
  const [openSheetId, setOpenSheetId] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [userExpenseData, setUserExpenseData] = useState({
    sheets: [],
    expenses: [],
  });

  useEffect(() => {
    initialUIUpdate();
  }, []);

  // Sheet navigation
  const VISIBLE = 6;

  useEffect(() => {
    const currentIndex = userExpenseData.sheets.findIndex(
      (sheet) =>
        (sheet.id && currentSheet.id && sheet.id === currentSheet.id) ||
        (sheet.clientId &&
          currentSheet.clientId &&
          sheet.clientId === currentSheet.clientId),
    );

    if (currentIndex === -1) return;

    const newStartIndex = Math.floor(currentIndex / VISIBLE) * VISIBLE;
    setStartIndex(newStartIndex);
  }, [currentSheet, userExpenseData.sheets]);

  const visibleSheets = userExpenseData.sheets.slice(
    startIndex,
    startIndex + VISIBLE,
  );

  function handleSheetScrollLeft() {
    setStartIndex((prev) => Math.max(prev - VISIBLE, 0));
  }

  function handleSheetScrollRight() {
    setStartIndex((prev) => {
      const nextStart = prev + VISIBLE;
      return nextStart >= userExpenseData.sheets.length ? prev : nextStart;
    });
  }

  const updateUI = async () => {
    console.log("hey lol")
    try {
      const res = await fetch(`${API_BASE}/expense`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        console.warn("updateUI failed:", res.status);
        return;
      }

      const data = await res.json();
      console.log("UserExpenseData from API:", data);
      setUserExpenseData(data);
    } catch (err) {
      console.error("updateUI crashed:", err);
    }
  };

  const initialUIUpdate = async () => {
    console.log('WE MADE IT HERE')
    try {
      const res = await fetch(`${API_BASE}/expense`, {
        credentials: "include",
      });

      if (!res.ok) {
        console.warn("updateUI failed:", res.status);
        return;
      }

      const data = await res.json();
      console.log("UserExpenseData from API:", data);
      setUserExpenseData(data);
      setCurrentSheet(data.sheets?.[0] ?? null);
    } catch (err) {
      console.error("ititialUpdateUI crashed:", err);
    }
  };

  const updateUIAfterNewSheetAdd = async () => {
    try {
      const res = await fetch(`${API_BASE}/expense`, {
        credentials: "include",
      });

      if (!res.ok) {
        console.warn("updateUI failed:", res.status);
        return;
      }

      const data = await res.json();
      console.log("UserExpenseData from API:", data);
      setUserExpenseData(data);
      setCurrentSheet(data.sheets.at(-1));
    } catch (err) {
      console.error("updateUIAFterNewSheetAdd crashed:", err);
    }
  };

  // useEffect(() => {
  //   setIsLoading(true)
  //   const timer = setTimeout(() => {
  //     setUserExpenseData(mockData);

  //     if (!currentSheet && mockData?.sheets?.length) {
  //       setCurrentSheet(mockData.sheets[0]);
  //     }
  //     setIsLoading(false)
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  function handleRowChange(rowId, field, value) {
    setUserExpenseData((prev) => ({
      ...prev,
      expenses: prev.expenses.map((e) =>
        (e.id ?? e.clientId) === rowId ? { ...e, [field]: value } : e,
      ),
    }));
  }

  async function addRow() {
    const newRow = {
      clientId: crypto.randomUUID(),
      name: "",
      amount: null,
      isPaid: false,
      sheetId: currentSheet.id,
    };

    setUserExpenseData((prev) => ({
      ...prev,
      expenses: [...prev.expenses, newRow],
    }));

    const res = await fetch(`${API_BASE}/expense/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRow),
    });

    if (!res.ok) {
      console.warn("Save failed:", res.status);
      return;
    }

    updateUI();
  }

  async function addSheet() {
    if (userExpenseData.sheets.length >= 18) {
      return;
    }

    const temp = {
      id: null,
      clientId: crypto.randomUUID(),
      label: "New Sheet",
      netIncome: null,
      userId: context?.currentUser?.id,
    };

    const starters = Array.from({ length: 15 }, () => ({
      clientId: crypto.randomUUID(),
      name: "",
      amount: null,
      isPaid: false,
      sheetId: temp.id,
    }));

    setUserExpenseData((prev) => ({
      ...prev,
      sheets: [...prev.sheets, temp],
      expenses: [...prev.expenses, ...starters],
    }));

    setCurrentSheet(temp);

    try {
      const res = await fetch(`${API_BASE}/sheet/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          sheets: temp,
          expenses: [starters],
        }),
      });

      if (!res.ok) throw new Error(`create sheet failed: ${res.status}`);
      const created = await res.json();

      setUserExpenseData((prev) => ({
        ...prev,
        sheets: prev.sheets.map((s) => (s.id === created.id ? created : s)),
      }));

      updateUIAfterNewSheetAdd();
    } catch (err) {
      console.error(err);

      setUserExpenseData((prev) => ({
        ...prev,
        sheets: prev.sheets.filter((s) => s.clientId !== temp.clientId),
      }));
    }
  }

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

  async function deleteRow(rowId) {
    setUserExpenseData((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => (e.id ?? e.clientId) !== rowId),
    }));

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
  }

  const handleNetIncomeChange = (value) => {
    setCurrentSheet((prev) => ({ ...prev, netIncome: value }));

    setUserExpenseData((prev) => ({
      ...prev,
      sheets: prev.sheets.map((sheet) =>
        sheet.id === currentSheet.id ? { ...sheet, netIncome: value } : sheet,
      ),
    }));
  };

  async function saveNetIncomeToDb() {
    const newNetIncome = currentSheet.netIncome;
    const restoredSheet = currentSheet;

    const res = await fetch(`${API_BASE}/sheet/net-income`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        netIncome: newNetIncome,
        sheetId: currentSheet.id,
      }),
    });

    if (!res.ok) {
      console.warn("Save failed:", res.status);
      return;
    }

    updateUI();
  }

  function toggleSheetOverlay() {
    setSheetOverlayVisible((prev) => !prev);
  }

  function toggleMenuSheetBackdrop() {
    setSheetMenuOverlayVisible((prev) => !prev);
  }

  const total = userExpenseData.expenses
    .filter((row) => row.sheetId != null && row.sheetId === currentSheet.id)
    .reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);

  const totalPaid = userExpenseData.expenses
    .filter((row) => row.sheetId != null && row.sheetId === currentSheet.id)
    .reduce((sum, row) => {
      if (!row.isPaid) return sum;

      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

  function startRename(sheet) {
    const id = sheet.id ?? sheet.clientId;
    setRenamingSheetId(id);
    setDraftSheetLabel(sheet.label);
  }

  async function saveRename() {
    if (!renamingSheetId) return;

    const next = draftSheetLabel.trim();
    if (!next) return;

    const currentKey = renamingSheetId;

    setUserExpenseData((prev) => ({
      ...prev,
      sheets: prev.sheets.map((s) => {
        const sheetKey = s.id ?? s.clientId;
        return sheetKey === currentKey ? { ...s, label: next } : s;
      }),
    }));

    const res = await fetch(`${API_BASE}/sheet/label`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updatedLabel: next,
        sheetId: renamingSheetId,
      }),
    });

    if (!res.ok) {
      console.warn("Save failed:", res.status);
      return;
    }

    setRenamingSheetId(null);
    updateUI();
  }

  async function deleteSheet(sheetIdToDelete) {
    if (userExpenseData.sheets.length <= 1) return;
    setUserExpenseData((prev) => {
      const remainingSheets = prev.sheets.filter(
        (s) => (s.id ?? s.clientId) !== sheetIdToDelete,
      );
      const remainingExpenses = prev.expenses.filter(
        (e) => (e.id ?? e.clientId) !== sheetIdToDelete,
      );

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

    const res = await fetch(`${API_BASE}/sheet/${sheetIdToDelete}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.warn("Delete failed:", res.status);
      return;
    }

    updateUI();
  }

  function toggleSheetMenu(sheetId) {
    setOpenSheetId((prev) => (prev === sheetId ? null : sheetId));
  }

  function isMenuOpen() {
    if (openSheetId != null) {
      return true;
    } else if (openSheetId === null) {
      return false;
    }
  }

  const netIncomeNum = Number(currentSheet?.netIncome ?? 0);

  if (isLoading) {
    return (
      <div className="spinner">
        <img src={spinner} alt="loading spinner" />
      </div>
    );
  }

  return (
    <div className="expense-content-container">
      <div className="table-with-add">
        <div className="expense-table-container">
          <ul className="expense-table-headers">
            <li>Expense</li>
            <li>Amount</li>
            <li>Paid</li>
          </ul>

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
      </div>

      <div className="net-monthly-container">
        <div className="monthly-total-label">Net Monthly Income</div>
        <div className="net-total-container">
          <input
            type="number"
            name="net-total"
            value={currentSheet.netIncome ?? ""}
            onChange={(e) => handleNetIncomeChange(e.target.value)}
            onBlur={saveNetIncomeToDb}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.target.blur();
              }
            }}
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
              labels: ["Paid", "Unpaid"],
              datasets: [
                {
                  label: "Total",
                  data: [`${totalPaid}`, `${total - totalPaid}`],
                  backgroundColor: ["#26b52174", "#282f297c"],
                  borderWidth: 2,
                  borderColor: "gray",
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="monthly-expendable-container">
        <div className="monthly-total-label">Expendable Income</div>
        <div className="monthly-total-amount">{netIncomeNum - total}</div>
        <div className="expendable-income-bar">
          <Bar
            data={{
              labels: ["Net Income", "Total Expenses"],
              datasets: [
                {
                  label: "Total",
                  data: [`${currentSheet.netIncome}`, `${total}`],
                  backgroundColor: ["rgba(38, 160, 52, 0.5)"],
                },
              ],
              options: {
                responsive: true,
              },
            }}
          />
        </div>
      </div>

      <div className="sheets-wrapper">
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

          <Sheet
            className="mobile"
            key={currentSheet.id}
            sheet={currentSheet}
            startRename={startRename}
            isRenamingSheet={isRenamingSheet}
            saveRename={saveRename}
            draftSheetLabel={draftSheetLabel}
            setDraftSheetLabel={setDraftSheetLabel}
            deleteSheet={deleteSheet}
            openSheetId={openSheetId}
            toggleSheetMenu={toggleSheetMenu}
            setCurrentSheet={setCurrentSheet}
            currentSheet={currentSheet}
            renamingSheetId={renamingSheetId}
            setRenamingSheetId={setRenamingSheetId}
          />

          {visibleSheets.map((sheet) => (
            <Sheet
              className="desktop"
              key={sheet.id ?? sheet.clientId}
              sheet={sheet}
              startRename={startRename}
              isRenamingSheet={isRenamingSheet}
              saveRename={saveRename}
              draftSheetLabel={draftSheetLabel}
              setDraftSheetLabel={setDraftSheetLabel}
              deleteSheet={deleteSheet}
              openSheetId={openSheetId}
              toggleSheetMenu={toggleSheetMenu}
              setCurrentSheet={setCurrentSheet}
              currentSheet={currentSheet}
              renamingSheetId={renamingSheetId}
              setRenamingSheetId={setRenamingSheetId}
              isCurrent={sheet.id === currentSheet.id}
              userExpenseData={userExpenseData}
            />
          ))}
        </div>

        <div className="sheet-scroll-buttons-container desktop">
          <div
            className="scroll-left-container"
            onClick={() => {
              handleSheetScrollLeft();
            }}
          >
            <AiFillCaretLeft className="scroll-left-button" />
          </div>
          <div
            className="scroll-right-container"
            onClick={() => {
              handleSheetScrollRight();
            }}
          >
            <AiFillCaretRight className="scroll-right-button" />
          </div>
        </div>

        <div
          className="new-sheet-container desktop"
          onClick={() => {
            addSheet();
          }}
        >
          <div className="new-sheet">+</div>
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

      {isMenuOpen() && (
        <div
          className="menu-overlay"
          onClick={() => {
            setOpenSheetId(null);
          }}
        ></div>
      )}
    </div>
  );
};

export default Expenses;
