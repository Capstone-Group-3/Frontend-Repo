import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
    async function registerUser(event) {
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={registerUser}>Register for an account
            <br />
            <input type="text"/>
            <br />
            <input type="text"/>
            <br />
            <button>Submit</button>
            <p>Already have an account? <Link to="/login">Log in here</Link></p>
            </form>
        </div>
    )
};

export default Register;