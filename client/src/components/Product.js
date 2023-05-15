import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { DiscussionContainer } from "./DiscussionContainer";
import { UseUserContext } from "../hooks/useUserContext";

export function Product(props) {
  const [showPopup, setShowPopup] = useState(false);

  const handleViewProductClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const { getUser } = UseUserContext();
  const user = getUser();

  return (
    <section id="productCard" className="section-p1">
      <div className="pro-container">
        <div className="pro">
          <div>
            <img
              src={props.details.image}
              style={{ height: "200px", width: "200px" }}
              alt=""
            />
          </div>
          <h5>{props.details.productName}</h5>
          <span>{props.details.userName}</span>
          <h4>Rs. {props.details.price}</h4>
          <div style={{ display: "felx", justifyContent: "space-evenly" }}>
            <button
              title="View Product"
              onClick={(e) => {
                handleViewProductClick();
              }}
            >
              <FontAwesomeIcon icon={faMessage} />
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <div
          className="popup"
          style={{ display: showPopup ? "flex" : "none" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClosePopup();
            }
          }}
        >
          <div className="popup-content">
            <img src={props.details.image} alt={props.details.productName} />
            <h4 style={{ color: "black" }}>{props.details.productName}</h4>
            <h2 style={{ color: "black" }}>{props.details.storename}</h2>
            <p>
              <h5>Description</h5>
              {props.details.description}
            </p>
            <h3>Discussion</h3>
            {user?.role === "User" ? (
              <div>
                <DiscussionContainer
                  discussionArray={props.details.discussion}
                  productID={props.details._id}
                  userName={user.userName}
                  userID={user._id}
                  sender="user"
                />
              </div>
            ) : (
              <h6>Please Login To Start a discussion</h6>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
