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

    // import outlet context of open orders (standby)
    // input for payment info  -- cardnumber, expiration date, cvv, address & name
    // drop down to change quantity
    // button to remove item from cart
    // calculates total
    // button for checkout (verifies everything as accurate then takes you to a success page)

    return (
        <div>
            <p>shopping cart</p>
            <Link to="products">Browse more items</Link>
        </div>
    )
};

export default Shopcart;