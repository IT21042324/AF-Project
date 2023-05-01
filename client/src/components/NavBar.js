import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

export function NavBar() {
  const [selection, setSelection] = useState("Home");
  function onNavLinkClick() {}

  //To get the logged in userRoler

  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/") {
      setSelection("Home");
    } else if (path === "/buyer/product") {
      setSelection("Products");
    } else if (path === "/register") {
      setSelection("Seller");
    } else if (path === "/seller/store") {
      setSelection("Store");
    } else if (path === "/buyer") {
      setSelection("TrackOrders");
    }
  }, []);

  return (
    <nav>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <div className={selection === "Home" ? "active" : ""}>Home</div>
      </Link>
      <Link
        to="/buyer/product"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={selection === "Products" ? "active" : ""}>Products</div>
      </Link>

      <Link to="/buyer" style={{ textDecoration: "none", color: "black" }}>
        <div className={selection === "TrackOrders" ? "active" : ""}>
          Track Orders
        </div>
      </Link>

      <Link
        to="/seller/store"
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => onNavLinkClick("Store")}
      >
        <div className={selection === "Store" ? "active" : ""}>Store</div>
      </Link>

      <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
        <div className={selection === "Seller" ? "active" : ""}>
          Sell On RB&NS
        </div>
      </Link>
    </nav>
  );
}
