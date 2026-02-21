
const SheetOverlay = ({
  userExpenseData,
  toggleSheetOverlay,
  currentSheet,
  setSheetOverlayVisible,
  setCurrentSheet,
  sheetOverlayVisible
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
            key={sheet.id}
            sheet={sheet}
          >
            {sheet.label}

            {sheet.id === currentSheet.id && <div>✅</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SheetOverlay;
