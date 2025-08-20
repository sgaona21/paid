
const UserSignUp = () => {

    return (
      <div className="form--centered">
        <h2>Sign Up</h2>

        {/* dynamically renders a list of validation errors depending on what user input into the sign up form  */}
        {errors.length ? (
          <div className="validation--errors">
            <h3>Sign Up Errors</h3>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <form onSubmit={submitNewUser}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={newUser.firstName}
            onChange={handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={newUser.lastName}
            onChange={handleChange}
          />

          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={newUser.emailAddress}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChange}
          />

          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" type="button" onClick={handleCancel} >
            Cancel
          </button>
        </form>

        <p>
          Already have a user account? Click here to{" "}
          <NavLink to="/sign-in">sign in</NavLink>!
        </p>
      </div>
    );

}

export default UserSignUp;
