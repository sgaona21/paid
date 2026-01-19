import '../styles/layout.css';
import { Link, Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

import Expenses from './Expenses';


const Layout = () => {
    const [currentUser, setCurrentUser] = useState(null)

    if (currentUser === null) {
        return <Navigate to="/login" replace />
    }

    return (
        
        <main className='layout-container'>
            <section className='dashboard'>
                <h2>Paid</h2>
            </section>

            <section className='header'>
                <h2>Monthly Expenses</h2>
                <div className='logged-in'>
                    <div className='welcome'>Welcome, {currentUser}</div>
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