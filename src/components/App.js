import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";


const App = () => {
const [username, setUsername] = useState("");
const [userId, setUserId] = useState(0);
const [products, setProducts] = useState([]);
const [isAdmin, setIsAdmin] = useState(false);
const [loggedIn, setLoggedIn] = useState(null);
const [pendingOrders, setPendingOrders] = useState([]);
const [shopCartId, setShopCartId] = useState(0);
const currentToken = localStorage.getItem("token");

const pageContext = { 
    usernameState: [username, setUsername],
    idState: [userId, setUserId],
    productsState: [products, setProducts],
    currentToken,
    adminState: [isAdmin, setIsAdmin],
    loggedInState: [loggedIn, setLoggedIn],
    shopCartState: [pendingOrders, setPendingOrders],
    shopCartIdState: [shopCartId, setShopCartId]
};

useEffect(() => {
    async function fetchProducts() {
        try {
            const response = await fetch("http://localhost:3030/api/products/", {
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
            const response = await fetch ("http://localhost:3030/api/users/me", {
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


// this is getting cart items, but if there are no items in a cart it does not return anything and the states are not set to the new standby cart. new call/path necessary for this
useEffect(() => {
    // added this
    async function loadCurrentShoppingCart() {
        try {
            const response = await fetch ("http://localhost:3030/api/shopcart/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    userId: userId
                })
            })
            // extra error "type error" -- but still sets id
            const data = await response.json();
            setShopCartId(data.id)
            console.log("shop cart id STATE: ", shopCartId)
        } catch (error) {
            console.error(error)
        }
    }

    // import checkoutfunc to app.js then use it as dependency for useffect load on shopcart id
    loadCurrentShoppingCart();


}, [userId])

useEffect(() => {
    async function loadPendingOrders() {
        try {
            const response = await fetch (`http://localhost:3030/api/shopcart/${userId}/status`, {
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
            console.log("the order data: ", data);
            setPendingOrders(data);
        } catch (error) {
            console.error(error)
        }
    }

    loadPendingOrders();

}, [shopCartId])


    return (
        <div>
            <div>
                <h1>Marketplace App</h1>
                <Navbar isAdmin={isAdmin}/>
            </div>
            <Outlet context={pageContext}/>
            <Footer />
        </div>
    )
};

export default App;