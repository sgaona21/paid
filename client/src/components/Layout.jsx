import '../styles/layout.css';
import { Link, Outlet, Navigate } from "react-router-dom";
import { useState, useContext } from "react";

import Expenses from './Expenses';
import UserContext from "../auth/UserContext";


const Layout = () => {
    const context = useContext(UserContext);
    console.log(context.currentUser)

    if (context.currentUser === null) {
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
                    <div className='welcome'>Welcome, {context.currentUser.name}</div>
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