import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style/style.css";
import Homepage from "./components/Homepage";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

const appElement = document.getElementById("app");
const root = createRoot(appElement);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage />,
        children: [
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
            }
        ]
    }
]);

root.render(<RouterProvider router={router} />);