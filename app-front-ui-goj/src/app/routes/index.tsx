import { createBrowserRouter } from "react-router-dom";
import Layout from "../../Layout";
import React from "react";
import Home from "../pages/HomePage.tsx";
import NotFoundException from "../exceptions/NotFoundException.tsx";
import Map from "../pages/Map.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "map", element: <Map /> },
    ],
  },
  {
    path: "501",
    element: null,
  },
  {
    path: "*",
    element: <NotFoundException />,
  },
]);
