import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";



const UserSignUp = () => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    }); //creates object with all needed user info to create new user
    const [errors, setErrors] = useState([]);

    const credentials = {
      emailAddress: newUser.emailAddress,
      password: newUser.password
    }

    const handleChange = (e) => {
      //allows for real time form input 
      const { name, value } = e.target;
      setNewUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const submitNewUser = async (e) => {
      //submit new user data to db and checks for errors, signs user in and navigates to courses page upon successful user creation
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5001/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.status === 201) {
          console.log("New User Account successfully created!");
          await context.actions.signIn(credentials);
          navigate('/courses');
        } else if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors)
          console.log(data)
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };

    const handleCancel = () => {
      //allows user to exit the sign up form and return to courses page 
      navigate('/')
    }


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
                name="emailAddress"
                type="email"
                value={newUser.emailAddress}
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
            <NavLink to="/sign-in">sign in</NavLink>!
          </p>
        </div>
      </div>
    );

}

export default UserSignUp;