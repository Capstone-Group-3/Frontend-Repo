import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Shopcart = () => {
    const { idState } = useOutletContext();
    const { productsState } = useOutletContext();
    const { currentToken } = useOutletContext();
    const [userId, setUserId] = idState;
    const [products, setProducts] = productsState;
    const navigate = useNavigate();

    const [pendingOrders, setPendingOrders] = useState([]);

    // api call for shopcart info based on standby
    useEffect(() => {
        async function loadPendingOrders() {
            try {
                const response = await fetch (`http://localhost:3030/api/shopcart/${userId}/status`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentToken}`
                    },
                    body: JSON.stringify({
                        cartStatus: "standby"
                    })
                })
                const data = await response.json();
                console.log("the order data: ", data);
                setPendingOrders(data);
            } catch (error) {
                console.error(error)
            }
        }
    
        loadPendingOrders();

    }, [])

    // input for payment info
    // drop down to change quantity
    // calculates total
    // button for checkout (verifies everything as accurate then takes you to a success page)

    return (
        <div>
            <p>shopping cart</p>
            <Link to="/">Return to homepage</Link>
        </div>
    )
};

export default Shopcart;