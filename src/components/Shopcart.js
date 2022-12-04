import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Shopcart = () => {
    const { idState } = useOutletContext();
    const { productsState } = useOutletContext();
    const { shopCartState } = useOutletContext();
    const { currentToken } = useOutletContext();
    const [userId, setUserId] = idState;
    const [products, setProducts] = productsState;
    const [pendingOrders, setPendingOrders] = shopCartState;
    const navigate = useNavigate();

    // FUNCTIONS:
        // updating inputs of card #, expiration date, cvv, address and name
        // calculating total
        // api call to change quantity of item on cart
        // api call to remove item from cart
        // api call to checkout that navigates to new success page

    // input for payment info  -- cardnumber, expiration date, cvv, address & name
    // drop down to change quantity
    // button to remove item from cart
    // calculates total
    // button for checkout (verifies everything as accurate then takes you to a success page)

    async function changeProductQuantity() {
        try {
            const response = await fetch(`http://localhost:3030/api/shopcart/${shopcartid}/quantity`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    productId: var1,
                    quantity: var2
                })
            })
            const data = await response.json();
        } catch (error) {
            console.error(error)
        }
    };

    async function removeProductFromOrder() {
        try {
            const response = await fetch(`http://localhost:3030/api/shopcart/${shopcartid}/remove`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    productId: var1,
                })
            })
            const data = await response.json();
        } catch (error) {
            console.error(error)
        }
    };

    async function checkOutFunc() {
        try {
            const response = await fetch(`http://localhost:3030/api/shopcart/${shopcartid}/quantity`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    cartStatus: var1,
                })
            })
            const data = await response.json();
        } catch (error) {
            console.error(error)
        }
    };




    console.log("pending orders: ", pendingOrders)
    console.log("pending orders length: ", pendingOrders.length)

    return (
        <div>
            <p>shopping cart</p>
            <Link to="/products">Browse more items</Link>
        </div>
    )
};

export default Shopcart;