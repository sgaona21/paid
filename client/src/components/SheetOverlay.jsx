
const SheetOverlay = ({
  userExpenseData,
  toggleSheetOverlay,
  currentSheet,
  setSheetOverlayVisible,
  setCurrentSheet,
  sheetOverlayVisible,
  addSheet
}) => {

  function selectSheet(sheet) {
    setSheetOverlayVisible(false);
    setCurrentSheet(sheet)
  }

  return (
    <div
      className={`sheet-overlay-backdrop ${sheetOverlayVisible ? "show" : ""}`}
      // onClick={() => toggleSheetOverlay()}
      onClick={() => setSheetOverlayVisible(false)}
    >
      <div className={`sheet-overlay ${sheetOverlayVisible ? "show" : ""}`}
      onClick={(e) => e.stopPropagation()}>
        {userExpenseData.sheets.map((sheet) => (
          <div
            className="sheet-container"
            onClick={() => selectSheet(sheet)}
            key={sheet.id ?? sheet.clientId}
            sheet={sheet}
          >
            {sheet.label}

            {(sheet.id ?? sheet.clientId) === (currentSheet.id ?? currentSheet.clientId) && <div>✅</div>}
          </div>
        ))}
        <button className="add-sheet" onClick={() => {
          addSheet();
          setSheetOverlayVisible(false);
          }}>Add Sheet</button>
      </div>
    </div>
  );
};

export default SheetOverlay;
