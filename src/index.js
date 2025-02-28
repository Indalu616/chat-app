import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import UserContextProvider from "./components/UserContext/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
