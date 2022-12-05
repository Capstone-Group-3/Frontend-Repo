import React, { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    const { currentToken } = useOutletContext();

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 2000);
    }, [])

    return (
        <div> 
            { currentToken && currentToken.length ? 
            <div>
                <h1>Successful Checkout!</h1>
                <Link to="/">Click here if you are not redirected to the homepage in a few seconds</Link>
            </div>
            : null }
         </div>
    )
};

export default CheckoutSuccess;