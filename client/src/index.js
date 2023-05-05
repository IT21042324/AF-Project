import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserContextProvider } from "./context/userContext";
import { ProductContextProvider } from "./context/productContext";
import { UserListContextProvider } from "./context/userListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <UserListContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </UserListContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
