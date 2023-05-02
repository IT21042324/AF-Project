import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UseUserContext } from "./context/useUserContext";
import { UseProductContext } from "./context/useProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UseUserContext>
        <UseProductContext>
          <App />
        </UseProductContext>
      </UseUserContext>
    </BrowserRouter>
  </React.StrictMode>
);
