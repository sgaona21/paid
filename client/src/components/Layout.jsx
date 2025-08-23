import '../styles/layout.css';
import { Link, Outlet } from "react-router-dom";

import Expenses from './Expenses';


const Layout = () => {
    return (
        <main className='layout-container'>
            <section className='dashboard'>
                <h2>Paid.com</h2>
            </section>

            <section className='header'>
                <h2>Monthly Expenses</h2>
                <div className='logged-in'>
                    <div className='welcome'>Welcome, Steven</div>
                    <div className='logout'>Log Out</div>
                </div>
            </section>

            <section className='content'>
                <Outlet />
            </section>
        </main>
    )
}

export default Layout;