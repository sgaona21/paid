import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import '../styles/register-mobile-first.css';

import UserContext from "../auth/UserContext";
import paidLogo from '../assets/paid-logo.png';



const UserSignUp = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

        useEffect(() => {
          fetch(`${API_BASE}/users/restore`, { credentials: "include" })
            .then(async (res) => {
              if (res.status === 204) return null;
              if (!res.ok) return null;
              return res.json();
            })
            .then((data) => {
              if (data) {
                navigate("/");
              }
            });
        }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const submitNewUser = async (e) => {
      e.preventDefault();
      const API_BASE = import.meta.env.VITE_API_BASE_URL;


      try {
        const response = await fetch(`${API_BASE}/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.status === 201) {
          console.log("New User Account successfully created!");
          const user = await context.actions.signIn({
            email: newUser.email,
            password: newUser.password,
          });
          if (user) {
            navigate('/');
          }
        } else if (response.status === 400) {
          const data = await response.json();
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setNewUser((prev) => ({ ...prev, password: "" }));
      }
    };



    return (
      <div className="signup-container">
        <div className="signup-header">
          <div className='logo'><img src={paidLogo} alt="site logo" /></div>
        </div>

        <div className="signup-content">
          <button className="demo-option">View Demo</button>
          {/* <p> - or - </p> */}
          <form className="signup-form" onSubmit={submitNewUser}>
            <h2>Sign Up</h2>
            <div className="form-input-wrapper">
            <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={newUser.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-input-wrapper">
            <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={newUser.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-input-wrapper">
            <label htmlFor="emailAddress">Email</label>
              <input
                id="emailAddress"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-input-wrapper">
            <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleChange}
              />
            </div>

            <button className="signup-button" type="submit">
                Sign Up
            </button>

          </form>

          <p>
            Click here to{" "}
            <NavLink to="/login">Sign In</NavLink>
          </p>
        </div>
      </div>
    );
}

export default UserSignUp;