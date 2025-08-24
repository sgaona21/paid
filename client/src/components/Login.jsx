import { useState, useContext } from "react";
import {  NavLink } from "react-router-dom";

import UserContext from "../auth/UserContext";

const LogIn = () => {
  const context = useContext(UserContext);
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
        }
      } catch (error) {
        console.log(error)
      }
    };

    return (
      <div className="signup-container">
        <div className="signup-header">
          <h2>Log In</h2>
        </div>

        <div className="signup-content">
          <form className="signup-form" onSubmit={handleSubmit}>

            <label htmlFor="email">Email Address</label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={loginInfo.email}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                value={loginInfo.password}
                onChange={handleChange}
              />
            </div>

            <button className="signup-button" type="submit">
                Log In
            </button>

          </form>

          <p>
            Dont have a user account? Click here to{" "}
            <NavLink to="/sign-up">Sign Up</NavLink>
          </p>
        </div>
      </div>
    );
}

export default LogIn;