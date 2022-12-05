import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({isAdmin}) => {

    return (
        <nav>
            <Link to="products">Browse Products</Link>
            <Link to="login">Log In</Link>
            <Link to="profile">Profile</Link>
            {isAdmin && <Link to="adminpanel">Admin Panel</Link>}
            <Link to="shopcart">🛒</Link>
        </nav>
    )
};

export default Navbar;