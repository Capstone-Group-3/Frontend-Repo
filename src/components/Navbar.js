import React from "react";
import { Link } from "react-router-dom";
import "./css/nickprofile.css"

const Navbar = ({isAdmin, pendingOrdersState, loggedIn, currentToken}) => {
    const [pendingOrders, setPendingOrders] = pendingOrdersState

    return (
        <nav className="Navbar">
            <Link className="nav-link" to="products">Browse Products</Link>
            {!currentToken && <Link className="nav-link" to="login">Log In</Link>}
            <Link className="nav-link" to="profile">Profile</Link>
            {isAdmin && <Link className="nav-link" to="adminpanel">Admin Panel</Link>}
            <Link className="nav-link" to="shopcart"> 🛒{pendingOrders.length}</Link>
        </nav>
    )
};

export default Navbar; 