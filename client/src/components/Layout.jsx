// import '../styles/layout.css';
import '../styles/layout-mobile-first.css';
import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import UserContext from "../auth/UserContext";
import paidLogo from '../assets/paid-logo.png';
import hamburger from '../assets/hamburger.png';
import userIcon from '../assets/user-icon.svg';



const Layout = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const [authLoading, setAuthLoading] = useState(true);
    const [isDashOpen, setIsDashOpen] = useState(true);
    const [signOutVisible, setSignOutVisible] = useState(false);
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
            <div className='dash-dropdown'>
              <h2 id="dashboard-header">Dashboard</h2>
              <div className='dash-arrow-wrapper'></div>
            </div>
            
            <ol className='dash-options'>
              <li>Expenses</li>
              <li>Income</li>
              <li>Debt</li>
            </ol>
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
          <Outlet />
        </section>
      </main>
    );
}

export default Layout;