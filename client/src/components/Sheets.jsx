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
  setCurrentSheet,
  setSheetMenuOverlayVisible,
  sheetMenuOverlayVisible,
  isArrowRotated,
  setIsArrowRotated,
}) => {
  // HELPERS
  const isCurrentSheet = sheet.id === currentSheet?.id;

  function toggleArrow() {
    setIsArrowRotated((prev) => !prev);
  }

  return (
    <div
      className={`current-sheet-desktop ${isCurrentSheet ? "selected" : ""}`}
      onClick={() => setCurrentSheet(sheet)}
    >
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
        className={`sheet-arrow-container ${isArrowRotated ? "rotated" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleArrow();
        }}
      >
        <img src={rightArrow} alt="right arrow" />
      </div>

      <div className={`sheet-menu ${isArrowRotated ? "show" : ""}`}>
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
