import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newError, setNewError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { loggedInState } = useOutletContext();
  const [loggedIn, setLoggedIn] = loggedInState;

  // jeremy: can destructure as: {loggedInState: [loggedIn, setLoggedIn]}

  async function registerUser(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://project-09-backend.onrender.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();
      // jeremy: can put all of this in: if (data.token.length {lines 36 - 45}) --- nice timout function with navigation ;P
      localStorage.setItem("token", data.token);
      setNewError(data.error);
      setSuccessMessage(data.message);
      setLoggedIn(true);

      if (data.token.length) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error;
      // jeremy: console.error(error)
    }
  }

  function updateUsernameState(event) {
    setUsername(event.target.value);
  }

  function updatePasswordState(event) {
    setPassword(event.target.value);
  }

  //jeremy: can create a single update handler function here:
  // const handleUpdate(event, setter) => setter(event.target.value)}
  // in tag's event: <Tag onClick={(event) => {handleUpdateState(event, setStateYouWantToChange)}

  return (
    <div id="login-container">
      <form className="adminIndivEdit" onSubmit={registerUser}>
        Register for an account
        <br />
        <input
          type="text"
          value={username}
          onChange={updateUsernameState}
          placeholder="Create Username"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={updatePasswordState}
          placeholder="Create Password"
        />
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
      {newError && newError.length ? (
        <div>
          <p>{newError}</p>
        </div>
      ) : (
        <div>
          <p>{successMessage}</p>
          <Link to="/profile">Go to profile</Link>
        </div>
      )}
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
};

export default Register;
