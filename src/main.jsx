import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Start from "./pages/Start/Start";
import Manual from "./pages/Manual/Manual";

import Error from "./pages/Error/Error";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: rootLoader,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Start />,
        // loader: teamLoader,
      },
      {
        path: "manual",
        element: <Manual />,
        // loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
