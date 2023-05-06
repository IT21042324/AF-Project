import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserContextProvider } from "./context/userContext";
import { ProductContextProvider } from "./context/productContext";
import { SearchContextProvider } from "./context/SearchContext";
import { UserListContextProvider } from "./context/userListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
  <SearchContextProvider>
      <UserContextProvider>
        <UserListContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </UserListContextProvider>
      </UserContextProvider>
  <SearchContextProvider>

    </BrowserRouter>
  </React.StrictMode>
);
