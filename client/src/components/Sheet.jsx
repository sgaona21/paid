import { useState } from "react";
import rightArrow from "../assets/right-arrow.png";

const Sheet = ({
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
  openSheetId,
  toggleSheetMenu
  
}) => {
//Hooks

//Helpers
const id = sheet.id ?? sheet.clientId;
const isOpen = openSheetId === id;

  return (
    <div className="current-sheet">
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

      <div className={`sheet-arrow-container ${isOpen ? "rotated" : ""}`}
      onClick={() => {
        toggleSheetMenu(id)
      }
      }>
        <img src={rightArrow} alt="right arrow" />
      </div>

      <div className={`sheet-menu ${isOpen ? "show" : ""}`}>
        <div className="rename-sheet" onClick={() => startRename()}>
          Rename
        </div>
        <div className="delete-sheet" onClick={() => {
            deleteSheet(sheet.id ?? sheet.clientId);
        }}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default Sheet;
