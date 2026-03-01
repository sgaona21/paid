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
  toggleSheetMenu,
  className,  
  renamingSheetId,
  setRenamingSheetId
}) => {
//Hooks

//Helpers
const id = sheet.id ?? sheet.clientId;
const isOpen = openSheetId === id;
const isCurrentSheet =
  (sheet.id ?? sheet.clientId) === (currentSheet?.id ?? currentSheet?.clientId);
const isRenamingThisSheet = renamingSheetId === id;  


  return (
    <div className={`current-sheet ${isCurrentSheet ? "selected" : ""} ${className}`}
    onClick={() => setCurrentSheet(sheet)}>
      <div className="sheet-label">
        {isRenamingThisSheet ? (
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
      onClick={(e) => {
        e.stopPropagation();
        toggleSheetMenu(id)
      }
      }>
        <img src={rightArrow} alt="right arrow" />
      </div>

      <div className={`sheet-menu ${isOpen ? "show" : ""}`}>
        <div className="rename-sheet" onClick={(e) => {
          e.stopPropagation();
          toggleSheetMenu(id);
          startRename(sheet)
          
        }}>
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
