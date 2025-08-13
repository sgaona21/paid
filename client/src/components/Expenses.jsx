import ExpenseRow from "./ExpenseRow";

const Expenses = () => {
  return (
    <div className="expense-content-container">
      <div className="expense-table-container">
        <ul className="expense-table-headers">
          <li>Expense</li>
          <li>Amount</li>
          <li>Paid</li>
        </ul>
        <ExpenseRow />
      </div>
    </div>
  );
};

export default Expenses;