import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style/style.css";
import Homepage from "./components/Homepage";
import ErrorPage from "./components/ErrorPage";

const appElement = document.getElementById("app");
const root = createRoot(appElement);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage />
    }
])

root.render(<RouterProvider router={router} />);