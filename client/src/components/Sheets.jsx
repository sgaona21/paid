const Sheets = ({ sheet, handleLabelChange, index }) => {
  return (
    <div className="sheet-input-container">
      <input
        type="text"
        name="sheet"
        value={sheet?.label ?? ""}
        onChange={(e) => handleLabelChange(index, "label", e.target.value)}
      ></input>
    </div>
  );
};

export default Sheets;
