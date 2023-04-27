import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import Start from "./pages/Start/Start";
import GoogleAuth from "./pages/GoogleAuth/GoogleAuth";
import Manual from "./pages/Manual/Manual";
import Result from "./pages/Result/Result";
import Error from "./pages/Error/Error";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Start />,
      },
      {
        path: "auth",
        element: (
          <GoogleOAuthProvider clientId="227087509653-vebn36qaass89cpfm6q76n2ri0vevvtk.apps.googleusercontent.com">
            <GoogleAuth />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: "manual",
        element: <Manual />,
      },
      {
        path: "result",
        element: <Result />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
