import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <p>Error - 404 Not Found</p>
            <Link to="/">Return to homepage</Link>
        </div>
    )
};

export default ErrorPage;