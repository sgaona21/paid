import '../css/expensepage.css'
import Nav from './Nav';

const ExpensePage = () => {
    return (
        <div id="page-layout">
        <Nav />

        <main>
            <section className="section-one">
                <h1 class="sub-dash-header">Monthly Expenses</h1>
            </section>

            <section class="section-two">
                <div id="expense-grid-container">
                    <ul id="main-table">
                        <li>Expense</li>
                        <li>Amount</li>
                        <li>Paid</li>
                    </ul>
                    <div class="expense-input-container">
                    </div>                
                    <div id="add-button">+</div>  
                </div>
                <div class="monthly-totals">
                    <div class="monthly-totals-title">Total Monthly Expenses</div>
                    <div>
                        <div class="total-monthly-amount"></div>
                    </div>
                </div>
                <div class="monthly-totals">
                    <div class="monthly-totals-title">Remaining Expenses</div>
                    <div>
                        <div class="remaining-amount"></div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    )
}

export default ExpensePage;