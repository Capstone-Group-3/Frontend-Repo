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

    useEffect(() => {
        async function loadUserOrders() {
            try {
                const response = await fetch ("http://localhost:3030/api/shopcart/{params here}", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentToken}`
                    }
                })
    
                const data = await response.json();
            } catch (error) {
                console.error
            }
        }
    
        loadUserOrders();
    
    }, [])

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