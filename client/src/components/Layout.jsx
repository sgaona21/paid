import '../styles/layout.css';
import { Link, Outlet } from "react-router-dom";

import Expenses from './Expenses';


const Layout = () => {
    return (
        <main className='layout-container'>
            <section className='dashboard'></section>

            <section className='header'></section>

            <section className='content'>
                <Outlet />
            </section>
        </main>
    )
}

export default Layout;