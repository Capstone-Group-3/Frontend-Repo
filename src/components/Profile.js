import React from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Profile = () => {
    const { usernameState } = useOutletContext();
    const { idState } = useOutletContext();
    const { currentToken } = useOutletContext();
    const [username, setUsername] = usernameState;
    const [id, setId] = idState;
    const navigate = useNavigate();

    function logOutUser(event) {
        event.preventDefault();
        localStorage.removeItem("token");
        setUsername("");
        setId("");
        navigate("/login");
    };

    return (
        <div>
            { currentToken && currentToken.length ?
            <div>
                <form onSubmit={logOutUser}>
                    <h1>username: {username}</h1>
                    <button type="submit">Log Out</button>
                </form>
            </div> : 
            <div>
                <p>Please log in or register for an account</p>
                <Link to="/login">Click here</Link>
            </div> 
            }
        </div>
    )
};

export default Profile;