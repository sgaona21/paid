import rightArrow from '../assets/right-arrow.png';

const Sheets = ({ sheet }) => {
  return (
    <div className="sheet-container">
      <div className="sheet-label">{sheet.label}</div>

      <div className="sheet-arrow-container">
        <img src={rightArrow} alt="right arrow" />
      </div>
    </div>
  );
};

export default Sheets;
