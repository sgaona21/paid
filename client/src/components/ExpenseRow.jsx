const ExpenseRow = ({ row, index, handleRowChange, deleteRow, saveRow }) => {
  return (
    <div className="expense-row-container">
      <div className="expense-row-inputs">
        <input
          type="text"
          name="expense-name"
          value={row?.name ?? ""}
          // onChange={(e) => handleRowChange(index, "name", e.target.value)}
          onChange={(e) => handleRowChange(row.id, "name", e.target.value)}
          onBlur={() => saveRow(row)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.target.blur();
            }
          }}
        ></input>
      </div>
      <div className="expense-row-inputs">
        <input
          type="number"
          name="expense-amount"
          value={row?.amount ?? ""}
          onChange={(e) =>
            // handleRowChange(index, "amount", Number(e.target.value))
            handleRowChange(row.id, "amount", e.target.value)
          }
          onBlur={() => saveRow(row)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.target.blur();
            }
          }}
        ></input>
      </div>
      <div className="expense-row-inputs checkbox-container">
        <input
          type="checkbox"
          name="expense-paid"
          checked={!!row?.isPaid}
          onChange={(e) => {
            // handleRowChange(index, "isPaid", e.target.checked);
            handleRowChange(row.id, "isPaid", e.target.checked);
            saveRow({ ...row, isPaid: e.target.checked });
          }}
          onBlur={() => saveRow(row)}
        ></input>
        <div className="delete-row" onClick={() => deleteRow(row.id)}>
          ❌
        </div>
      </div>
    </div>
  );
};

export default ExpenseRow;
