import { useState } from "react";
import rightArrow from "../assets/right-arrow.png";




const Sheets = ({
  isRenamingSheet,
  draftSheetLabel,
  setDraftSheetLabel,
  saveRename,
  currentSheet,
  sheetMenuVisible,
  setSheetMenuVisible,
  toggleMenuSheetBackdrop,
  sheet,
  startRename,
  deleteSheet,
  setCurrentSheet
}) => {
  // HELPERS
const isCurrentSheet = sheet.id === currentSheet?.id;

  return (
    <div className={`current-sheet-desktop ${isCurrentSheet ? "selected" : ""}`}
    onClick={() => setCurrentSheet(sheet)}>
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
          sheet.label
        )}
      </div>

      <div
        className={`sheet-arrow-container ${sheetMenuVisible ? "rotated" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setSheetMenuVisible((v) => !v);
          toggleMenuSheetBackdrop();
        }}
      >
        <img src={rightArrow} alt="right arrow" />
      </div>

      <div className={`sheet-menu ${sheetMenuVisible ? "show" : ""}`}>
          <div className="rename-sheet" onClick={() => startRename()}>
            Rename
          </div>
          <div
            className="delete-sheet"
            onClick={() => {
              deleteSheet(sheet.id ?? sheet.clientId);
              setSheetMenuVisible((prev) => !prev);
            }}
          >
            Delete
          </div>
        </div>  

    </div>
  );
};

export default Sheets;
