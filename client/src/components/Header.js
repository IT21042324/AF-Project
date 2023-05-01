import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useState } from "react";

// Defining the Header function
function Header() {
  // Setting initial state for showing the user profile popup
  const [showPopup, setShowPopup] = useState(false);

  // Defining function for closing the user profile popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Defining function for logging out the user
  const logoutFunction = () => {};

  // Rendering the Header component
  return (
    <header>
      <h1>RB&NS</h1>
      <NavBar />
      <div className="navbar-icons">
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "5px" }}>
              <Link to="/" onClick={logoutFunction}>
                <h6 style={{ float: "right", color: "red" }}>Logout</h6>
              </Link>
            </div>
            &nbsp;&nbsp;&nbsp;
            <img
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "40px",
                marginTop: "10px",
              }}
            />
          </div>
          <Link to="/login">Login</Link>
        </div>

        <Link to="/buyer/Cart">
          <div className="cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
        </Link>
      </div>

      <div
        className="popup"
        style={{ display: showPopup ? "flex" : "none", zIndex: "100" }}
      >
        <div className="popup-content">
          <img
            style={{
              backgroundColor: "white",
              width: "200px",
              height: "200px",
              borderRadius: "100%",
              border: "1px solid black",
            }}
          />

          <h4 style={{ color: "black" }}>
            <input
              type="text"
              style={{ border: "none", outline: "none", textAlign: "center" }}
              onFocus={(event) => {
                event.target.style.outline = "2px dashed black";
              }}
              onBlur={(event) => {
                event.target.style.outline = "none";
              }}
            />
          </h4>

          <input
            accept="image/*"
            type="file"
            id="changeProfilePic"
            style={{
              padding: "10px",
              color: "white",
              backgroundColor: "black",
            }}
          />

          <h2 style={{ color: "black" }}></h2>
          <input
            type="submit"
            value="Save Details"
            style={{
              padding: "10px",
              color: "white",
              backgroundColor: "black",
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
