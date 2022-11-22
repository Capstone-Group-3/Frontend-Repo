import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    async function logInUser(event) {
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={logInUser}>Log In
            <br />
            <input type="text"/>
            <br />
            <input type="text"/>
            <br />
            <button>Submit</button>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
    )
};

export default Login;