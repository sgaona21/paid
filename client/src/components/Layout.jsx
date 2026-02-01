import '../styles/layout.css';
import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import Expenses from './Expenses';
import UserContext from "../auth/UserContext";


const Layout = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const [checkingAuth, setCheckingAuth] = useState(true);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
      async function loadMe() {
        try {
          const res = await fetch(`${API_BASE}/users/restore`, {
            credentials: "include",
          });

          if (!res.ok) throw new Error("Not logged in");

          const user = await res.json();
          context.actions.setCurrentUser(user);
          setCheckingAuth(false)
        } catch {
          context.actions.setCurrentUser(null);
        } finally {
            setCheckingAuth(false);
        }
      }

      loadMe();
    }, [API_BASE]);

    async function signOut() {
      await fetch(`${API_BASE}/users/signout`, {
        method: "POST",
        credentials: "include",
      });

      context.actions.setCurrentUser(null);
      navigate("/login");
    }

    if (checkingAuth) return <div>Loading...</div>;

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
                    <div className='welcome'>Welcome, {context.currentUser.firstName}</div>
                    <div className='logout' onClick={signOut}>Sign Out</div>
                </div>
            </section>

            <section className='content'>
                <Outlet />
            </section>
        </main>
    )
}

export default Layout;