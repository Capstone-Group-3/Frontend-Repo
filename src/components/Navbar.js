import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAdmin, pendingOrdersState, loggedIn, currentToken }) => {
  const [pendingOrders, setPendingOrders] = pendingOrdersState;
  return (
    <nav className="Navbar">
      <Link to="products">Browse Products</Link>
      {!currentToken && <Link to="login">Log In</Link>}
      <Link to="profile">Profile</Link>
      {isAdmin && <Link to="adminpanel">Admin Panel</Link>}
      <Link to="shopcart">Your Cart 🛒{pendingOrders.length}</Link>
    </nav>
  );
};

export default Navbar;
