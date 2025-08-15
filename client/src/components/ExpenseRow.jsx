

const ExpenseRow = (props) => {
    return (
        <div className="expense-rows-container">
            <div className="expense-row-container">
                <div className="expense-row-inputs">
                    <input type="text" name="expense-name"  ></input>
                </div>
                <div className="expense-row-inputs">
                    <input type="number" name="expense-amount"></input>
                </div>
                <div className="expense-row-inputs">
                    <input type="checkbox" name="expense-paid"></input>
                    <div className="delete-row">❌</div>
                </div>
            </div>


        </div>
        
    )
}

export default ExpenseRow;