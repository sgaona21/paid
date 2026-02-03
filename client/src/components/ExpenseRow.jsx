

const ExpenseRow = ({ row, index, handleRowChange, deleteRow }) => {
    return (
        <div className="expense-rows-container">
            <div className="expense-row-container">
                <div className="expense-row-inputs">
                    <input 
                    type="text" 
                    name="expense-name"
                    value={row?.name ?? ""}
                    onChange={(e) => handleRowChange(index, "name", e.target.value)}
                     ></input>
                </div>
                <div className="expense-row-inputs">
                    <input 
                    type="number" 
                    name="expense-amount"
                    value={row?.amount ?? ""}
                    onChange={(e) => handleRowChange(index, "amount", Number(e.target.value))}
                    ></input>
                </div>
                <div className="expense-row-inputs">
                    <input 
                    type="checkbox" 
                    name="expense-paid"
                    checked={!!row?.isPaid}
                    onChange={(e) => handleRowChange(index, "paid", e.target.checked)}
                    ></input>
                    <div className="delete-row" onClick={deleteRow} >❌</div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseRow;