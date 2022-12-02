import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Profile = () => {
    const { usernameState } = useOutletContext();
    const { idState } = useOutletContext();
    const { productsState } = useOutletContext();
    const { currentToken } = useOutletContext();
    const [username, setUsername] = usernameState;
    const [userId, setUserId] = idState;
    const [products, setProducts] = productsState;
    const navigate = useNavigate();

    const [placedOrders, setPlacedOrders] = useState([]);

    useEffect(() => {
        function checkToken() {
            console.log("use effect token: ", currentToken);
        }
        checkToken();
    }, [])

    function logOutUser(event) {
        event.preventDefault();
        localStorage.removeItem("token");
        setUsername("");
        setUserId("");
        navigate("/login");
    };

    // still need to work on this for the /status path -- maybe add some dummy data for a few processed orders
    useEffect(() => {
        async function loadUserOrders() {
            try {
                const response = await fetch (`http://localhost:3030/api/shopcart/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentToken}`
                    }
                })
                const data = await response.json();
                console.log("the order data: ", data);
                setPlacedOrders(data);
            } catch (error) {
                console.error
            }
        }
    
        loadUserOrders();
    
    }, [])

// placed orders should show: product name that you bought
// need to do this for each one - both products and orders
    // have a find function within map function comparing productId to the id of the product
        // since there will only be one, a find is best instead of a filter

    return (
        <div>
            { currentToken && currentToken.length ?
            <div>
                <form onSubmit={logOutUser}>
                    <h1>username: {username}</h1>
                    <button type="submit">Log Out</button>
                </form>

                <br />

                
                <div>
                    <h1>Your Orders: </h1>
                    {placedOrders.map((eachOrder, idx) => {
                        const matchingProduct = products.find((element) => {
                            return eachOrder.productId == element.id })
                        return <div key={idx}>
                            <p>You ordered {eachOrder.quantity} <b>{matchingProduct.name}</b> for ${eachOrder.priceBoughtAt} each for a total of ${(eachOrder.quantity * eachOrder.priceBoughtAt).toFixed(2)} + shipping and handling</p>
                        </div>
                    })}
                </div>
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

