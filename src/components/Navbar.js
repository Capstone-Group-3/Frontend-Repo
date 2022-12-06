import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({isAdmin, pendingOrdersState}) => {
    const [pendingOrders, setPendingOrders] = pendingOrdersState

    return (
        <nav>
            <Link to="products">Browse Products</Link>
            <Link to="login">Log In</Link>
            <Link to="profile">Profile</Link>
            {isAdmin && <Link to="adminpanel">Admin Panel</Link>}
            <Link to="shopcart">Your Cart 🛒{pendingOrders.length}</Link>
        </nav>
    )
};

export default Navbar;