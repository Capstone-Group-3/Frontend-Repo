import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, Link } from "react-router-dom";


const App = () => {
const [username, setUsername] = useState("");
const [userId, setUserId] = useState(0);
const [products, setProducts] = useState([]);
const [isAdmin, setIsAdmin] = useState(false);
const [loggedIn, setLoggedIn] = useState(null);
const [pendingOrders, setPendingOrders] = useState([]);
const [shopCartId, setShopCartId] = useState(0);
const [checkoutData, setCheckoutData] = useState("");
const [shoppingSessionData, setShoppingSessionData] = useState("");
const currentToken = localStorage.getItem("token");

const pageContext = { 
    usernameState: [username, setUsername],
    idState: [userId, setUserId],
    productsState: [products, setProducts],
    currentToken,
    adminState: [isAdmin, setIsAdmin],
    loggedInState: [loggedIn, setLoggedIn],
    shopCartState: [pendingOrders, setPendingOrders],
    shopCartIdState: [shopCartId, setShopCartId],
    checkoutDataState: [checkoutData, setCheckoutData],
    shoppingSessionState: [shoppingSessionData, setShoppingSessionData]
};

useEffect(() => {
    async function fetchProducts() {
        try {
            const response = await fetch("https://project-09-backend.onrender.com/api/products/", {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error
        }
    }

    fetchProducts();
    
}, [])

// need a users/me route in api, or something similar that checks token against db for users and returns your data
useEffect(() => {
    async function loadProfileInfo() {
        try {
            const response = await fetch ("https://project-09-backend.onrender.com/api/users/me", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                }
            })

            const data = await response.json();
            setUsername(data.username);
            setUserId(data.id);
            setIsAdmin(data.isAdmin);

        } catch (error) {
            console.error
        }
    }

    loadProfileInfo();

}, [loggedIn])


// this is getting cart items, but if there are no items in a cart it does not return anything and the 
// states are not set to the new standby cart. new call/path necessary for this
useEffect(() => {
    // added this
    async function loadCurrentShoppingCart() {
        try {
            const response = await fetch ("https://project-09-backend.onrender.com/api/shopcart/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    userId: userId
                })
            })
            const data = await response.json();
            setShopCartId(data.id)
        } catch (error) {
            console.error(error)
        }
    }

    // import checkoutfunc to app.js then use it as dependency for useffect load on shopcart id
    loadCurrentShoppingCart();


}, [userId, checkoutData])

useEffect(() => {
    async function loadPendingOrders() {
        try {
            const response = await fetch (`https://project-09-backend.onrender.com/api/shopcart/${userId}/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    cartStatus: "standby"
                })
            })
            const data = await response.json();
            setPendingOrders(data);
        } catch (error) {
            console.error(error)
        }
    }

    loadPendingOrders();

}, [shopCartId, shoppingSessionData])

console.log("shop cart id STATE: ", shopCartId)
console.log("the order data: ", pendingOrders);

// add extra props to navbar => pendingorders.length + 1 (if not pendingorders.length then it's null)

    return (
        <div>

            <div id="nav-container">
                <h1><Link className="header" to="/">Threadline</Link></h1>

                <Navbar pendingOrdersState={[pendingOrders, setPendingOrders]} isAdmin={isAdmin} loggedIn={loggedIn} currentToken={currentToken}/>
            </div>
            <Outlet context={pageContext}/>
            <Footer />
        </div>
    )
};

export default App;