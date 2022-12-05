import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style/style.css";
import App from "./components/App";
import Homepage from "./components/Homepage";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Shopcart from "./components/Shopcart";
import CheckoutSuccess from "./components/CheckoutSuccess";

const appElement = document.getElementById("app");
const root = createRoot(appElement);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/adminpanel",
                element: <AdminPanel />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/products/:id",
                element: <ProductDetails />
            },
            {
                path: "/shopcart",
                element: <Shopcart />
            },
            {
                path: "/successpage",
                element: <CheckoutSuccess />
            }
        ]
    }
]);

root.render(<RouterProvider router={router} />);