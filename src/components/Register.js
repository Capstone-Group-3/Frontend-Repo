import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    // const apiRoutes = {
    //     products: {
    //       allProducts: "path for fetching all products",
    //       individualProduct: "path for one product"
    //     }
    //   } 
    //   const apiHostname = 'http://localhost:3030/api/'
    //   fetch(`${apiHostname}${allProducts}`, {})

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newError, setNewError] = useState(null);
    const [succesMessage, setSuccessMessage] = useState("");


    async function registerUser(event) {
        event.preventDefault();

        try {
            const response = await fetch("https://localhost:3030/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })

            const data = await response.json();
            console.log("The data: ", data);
            localStorage.setItem("token", data.token);
            setNewError(data.error);
            setSuccessMessage(data.message);

        } catch (error) {
            console.error
        }
    }

    function updateUsernameState(event) {
        setUsername(event.target.value)
    };

    function updatePasswordState(event) {
        setPassword(event.target.value)
    };


    return (
        <div>
            <form onSubmit={registerUser}>Register for an account
            <br />
            <input type="text" value={username} onChange={updateUsernameState} placeholder="Create Username"/>
            <br />
            <input type="password" value={password} onChange={updatePasswordState} placeholder="Create Password"/>
            <br />
            <button>Submit</button>
            <br />
            {newError && newError.length ?
                <div>
                    <p>{newError}</p>
                </div>
             :  <div>
                    <p>{succesMessage}</p>
                    <Link to="/profile">Go to your profile</Link>
                </div>}
            <p>Already have an account? <Link to="/login">Log in here</Link></p>
            </form>
        </div>
    )
};

export default Register;