import { useState, useContext, useEffect } from "react";
import {  NavLink, useNavigate } from "react-router-dom";

import '../styles/register-mobile-first.css';

import UserContext from "../auth/UserContext";
import paidLogo from '../assets/paid-logo.png';


const LogIn = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const user = await context.actions.signIn(loginInfo);
        if (user) {
          console.log(`Success! ${user.email} was successfully signed in!`);
          navigate('/');
        }
      } catch (error) {
        console.log(error)
      }
    };

    useEffect(() => {
      fetch(`${API_BASE}/users/restore`, { credentials: "include" })
        .then(async (res) => {
          if (res.status === 204) return null;
          if (!res.ok) return null;
          return res.json();
        })
        .then((data) => {
          if (data) {
            navigate('/')
          } 
        })
    }, []);

    return (
      <div className="signup-container">
        <div className="signup-header">
          <div className="logo">
            <img src={paidLogo} alt="site logo" />
          </div>
        </div>

        <div className="signup-content">
          <button className="demo-option">View Demo</button>
          {/* <p> - or - </p> */}
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div className="email-wrapper">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={loginInfo.email}
                onChange={handleChange}
              />
            </div>

            <div className="password-wrapper">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={loginInfo.password}
                onChange={handleChange}
              />
            </div>

            <button className="signup-button" type="submit">
              Sign In
            </button>
          </form>

          <p>
            Click here to <NavLink to="/sign-up">Sign Up</NavLink>
          </p>
        </div>
      </div>
    );
}

export default LogIn;