import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";


const App = () => {
const [username, setUsername] = useState("");
const [userId, setUserId] = useState("");
const [products, setProducts] = useState([]);
const [isAdmin, setIsAdmin] = useState(false);
const [loggedIn, setLoggedIn] = useState(null);
const [pendingOrders, setPendingOrders] = useState([]);
const currentToken = localStorage.getItem("token");

const pageContext = { 
    usernameState: [username, setUsername],
    idState: [userId, setUserId],
    productsState: [products, setProducts],
    currentToken,
    adminState: [isAdmin, setIsAdmin],
    loggedInState: [loggedIn, setLoggedIn],
    shopCartState: [pendingOrders, setPendingOrders]
};


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

}, [userId])


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