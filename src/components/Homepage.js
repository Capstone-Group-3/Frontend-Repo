import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Homepage = () => {
const [username, setUsername] = useState("");
const [id, setId] = useState("");
const [products, setProducts] = useState([]);
const currentToken = localStorage.getItem("token");
const pageContext = { 
    usernameState: [username, setUsername],
    idState: [id, setId],
    productsState: [products, setProducts],
    currentToken
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
            setUsername(data.response.username);
            setId(data.response.id);
            // also probably use this to set shopcart data? or maybe a different api call
        } catch (error) {
            console.error
        }
    }

    loadProfileInfo();

}, [])

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

    return (
        <div>
            <div>
                <h1>Marketplace App</h1>
                <Navbar />
            </div>
            <Outlet context={pageContext}/>
        </div>
    )
};

export default Homepage;