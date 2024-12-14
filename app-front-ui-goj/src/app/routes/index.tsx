import { createBrowserRouter } from "react-router-dom";
import Layout from "../../Layout";
import React from "react";
import Home from "../pages/HomePage";
import NotFoundException from "../exceptions/NotFoundException";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Home />},
        ]
    },
    {
        path: "501",
        element: null
    },
    {
        path: "*",
        element: <NotFoundException />
    },
])