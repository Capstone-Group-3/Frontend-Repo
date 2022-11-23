import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newError, setNewError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function logInUser(event) {
        event.preventDefault();
        try {
            const response = await fetch("https://localhost:3030/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const data = await response.json();
            localStorage.setItem("token", data.token);
            setNewError(data.error);
            setSuccessMessage(data.message);

        } catch (error) {
            console.error
        }
    };

    function updateUsername(event){
        setUsername(event.target.value)
    }

    function updatePassword(event){
        setPassword(event.target.value)
    }

    return (
        <div id="login-container">
            <form onSubmit={logInUser}>Log In
            <br />
            <input type="text" value={username} onChange={updateUsername} placeholder="Username" required/>
            <br />
            <input type="text" value={password} onChange={updatePassword} placeholder="Password" required/>
            <br />
            <button>Submit</button>
            <br/>
            
            {newError && newError.length ?
            <div><p>{newError}</p></div> :
            <div><p>{successMessage}</p>
            {/* -------------See about changing this to a navigate to profile on succesful login */}
                <Link to="/profile">Go to profile</Link>    
            </div>}
            
            <p>Don't have an account? <Link to={"/register"}>Register here</Link></p>
            </form>
        </div>
    )
};

export default Login;