// import '../styles/layout.css';
import '../styles/layout-mobile-first.css';
import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import UserContext from "../auth/UserContext";
import paidLogo from '../assets/paid-logo.png';
import hamburger from '../assets/hamburger.png';
import userIcon from '../assets/user-icon.svg';
import rightArrow from '../assets/right-arrow.png';
import Expenses from './Expenses';
import Debt from './Debt';
import Income from './Income';



const Layout = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const [authLoading, setAuthLoading] = useState(true);
    const [isDashOpen, setIsDashOpen] = useState(true);
    const [signOutVisible, setSignOutVisible] = useState(false);
    const [mobileDashOpen, setMobileDashOpen] = useState(false);
    const MENU = {
      EXPENSES: "expenses",
      INCOME: "income",
      DEBT: "debt"
    };
    const [selectedMenuItem, setSelectedMenuItem] = useState(MENU.EXPENSES);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
      fetch(`${API_BASE}/users/restore`, { credentials: "include" })
        .then(async (res) => {
          if (res.status === 204) return null;
          if (!res.ok) return null;
          return res.json();
        })
        .then((data) => {
          if (data) context.actions.setCurrentUser(data);
        })
        .finally(() => setAuthLoading(false));
    }, []);

    

    
    async function signOut() {
      await fetch(`${API_BASE}/users/signout`, {
        method: "POST",
        credentials: "include",
      });

      context.actions.setCurrentUser(null);
      navigate("/login");
    }

    function toggleSignOutButton() {
      setSignOutVisible(prev => !prev);
    }

    function toggleMobileDashOpen() {
      setMobileDashOpen(prev => !prev);
    }



    if (authLoading) {
      return <div>Loading...</div>
    }

    if (!context.currentUser) {
      return <Navigate to="/login" replace />;
    }


    return (
      <main className={`layout-container ${isDashOpen ? "dash" : "no-dash"}`}>
        {isDashOpen && (
          <section className="dashboard">
            <div className='dash-dropdown' onClick={toggleMobileDashOpen}>
              <h2 id="dashboard-header">Dashboard</h2>
              <div className='dash-arrow-wrapper'>
                <img src={rightArrow} className={`dash-right-arrow ${mobileDashOpen ? "open" : ""}`} alt="Down arrow icons created by Arkinasi - Flaticon" />
              </div>
            </div>
            {mobileDashOpen && (
              <ul className='dash-options'>
              <li onClick={() => setSelectedMenuItem(MENU.EXPENSES)}>Expenses</li>
              <li onClick={() => setSelectedMenuItem(MENU.INCOME)}>Income</li>
              <li onClick={() => setSelectedMenuItem(MENU.DEBT)}>Debt</li>
            </ul>
            )}
          </section>  
        )}

        <section className="header">
          <div className="hamburger" onClick={() => setIsDashOpen((v) => !v)}>
            <img src={hamburger} alt="hamburger menu icon" />
          </div>
          {/* <div className="logo">
            <img src={paidLogo} alt="site logo" />
          </div> */}
          <Link to="/" className="logo">
            <img src={paidLogo} alt="Home" />
          </Link>

          <div className="logged-in">
            <div className="user-icon">
              <img onClick={toggleSignOutButton} src={userIcon} alt="" />
            </div>
            <div className="welcome">{context.currentUser.firstName}</div>
            {signOutVisible && (
              <div className="logout" onClick={signOut}>
              Sign Out
            </div>
            )}
          </div>
        </section>

        <section className="content">
          {selectedMenuItem === "expenses" && <Expenses />}
          {selectedMenuItem === "income" && <Income />}
          {selectedMenuItem === "debt" && <Debt />}
        </section>
      </main>
    );
}

export default Layout;