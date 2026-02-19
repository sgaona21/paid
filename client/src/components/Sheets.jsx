const Sheets = ({ sheet, handleLabelChange, label }) => {
  return (
    <div className="sheet-input-container">
      <input
        type="text"
        name="sheet"
        value={sheet?.label ?? ""}
        onChange={(e) => handleLabelChange(e.target.value)}
        // onBlur={() => saveRow(row)}
      ></input>
    </div>
  );
};

export default Sheets;
