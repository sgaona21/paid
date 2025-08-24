import { useState } from "react";
import { NavLink } from "react-router-dom";


const UserSignUp = () => {
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const submitNewUser = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.status === 201) {
          console.log("New User Account successfully created!");
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
          <h2>Create Account</h2>
        </div>

        <div className="signup-content">
          <form className="signup-form" onSubmit={submitNewUser}>
            <label htmlFor="firstName">First Name</label>
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={newUser.firstName}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="lastName">Last Name</label>
            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={newUser.lastName}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="emailAddress">Email Address</label>
            <div>
              <input
                id="emailAddress"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="password">Password</label>
            <div>
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
            Already have a user account? Click here to{" "}
            <NavLink to="/login">Log In</NavLink>
          </p>
        </div>
      </div>
    );
}

export default UserSignUp;