import React, { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import "./css/PrestonAdmin.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newError, setNewError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { loggedInState } = useOutletContext();
  const [loggedIn, setLoggedIn] = loggedInState;

  async function logInUser(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://project-09-backend.onrender.com/api/users/login",
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
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
      setNewError(data.error);
      setSuccessMessage(data.message);

      if (data.token.length) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error;
    }
  }

  function updateUsername(event) {
    setUsername(event.target.value);
  }

  function updatePassword(event) {
    setPassword(event.target.value);
  }
  // jeremy: see register and shopcart for handling this in one function
  return (
    <div id="login-container">
      <form className="adminIndivEdit" onSubmit={logInUser}>
        Log In
        <br />
        <input
          type="text"
          value={username}
          onChange={updateUsername}
          placeholder="Your username"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={updatePassword}
          placeholder="Your password"
          required
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
          {/* -------------See about changing this to a navigate to profile on succesful login */}
          <Link to="/profile">Go to profile</Link>
        </div>
      )}
      <p>
        Don't have an account? <Link to={"/register"}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;
