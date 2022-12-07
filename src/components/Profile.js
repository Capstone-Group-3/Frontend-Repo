import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import "./css/nickprofile.css";

const Profile = () => {
  const { usernameState } = useOutletContext();
  const { idState } = useOutletContext();
  const { productsState } = useOutletContext();
  const { currentToken } = useOutletContext();
  const { adminState } = useOutletContext();
  const [isAdmin, setIsAdmin] = adminState;
  const [username, setUsername] = usernameState;
  const [userId, setUserId] = idState;
  const [products, setProducts] = productsState;
  const navigate = useNavigate();
  // jeremy: see Shopcart.js

  const [placedOrders, setPlacedOrders] = useState([]);

  function logOutUser(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    setUsername("");
    setUserId("");
    setIsAdmin(false);

    navigate("/login");
  }

  function handleClick(params) {
    navigate(`/products/${params.productId}`);
  }

  // placed orders should show: product name that you bought
  // need to do this for each one - both products and orders
  // have a find function within map function comparing productId to the id of the product
  // since there will only be one, a find is best instead of a filter
  // placed orders should show: product name that you bought
  // need to do this for each one - both products and orders
  // have a find function within map function comparing productId to the id of the product
  // since there will only be one, a find is best instead of a filter

  return (
    <div id="page-container">
      {currentToken && currentToken.length ? (
        <div>
          <form onSubmit={logOutUser}>
            <h1>username: {username}</h1>
            <button type="submit">Log Out</button>
          </form>
          <div id="order-container">
            <h1>Your Orders: </h1>
            {placedOrders && !!placedOrders.length ? (
              // jeremy: this can be it's own component: see Shopcart.js
              placedOrders.map((eachOrder, idx) => {
                const matchingProduct = products.find(
                  (element) => eachOrder.productId == element.id
                );
                return (
                  <div id="each-product-container" key={idx}>
                    <img
                      src={matchingProduct.image}
                      alt="product-image"
                      height="80"
                      width="80"
                    />
                    <p>
                      You ordered {eachOrder.quantity}{" "}
                      <b>{matchingProduct.name}</b> for $
                      {eachOrder.priceBoughtAt} each for a total of $
                      {(eachOrder.quantity * eachOrder.priceBoughtAt).toFixed(
                        2
                      )}{" "}
                      + shipping and handling
                    </p>
                    <button
                      onClick={() => {
                        handleClick(eachOrder);
                      }}
                      id="linkbtn"
                    >
                      View this item
                    </button>
                    <button id="cartbtn">Add to cart again</button>
                  </div>
                );
              })
            ) : (
              <p>
                No orders to display!
                <br />
                <Link to="/products">Try browsing for products!</Link>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>Please log in or register for an account</p>
          <Link to="/login">Click here</Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
