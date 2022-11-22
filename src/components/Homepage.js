import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Homepage = () => {
    const [test, setTest] = useState("");

    useEffect(() => {
        setTest("The test state");
        console.log(test);
    }, []);

    return (
        <div>
            <div>
                <h1>Marketplace App</h1>
                <Navbar />
            </div>
            <Outlet context={test}/>
        </div>
    )
};

export default Homepage;