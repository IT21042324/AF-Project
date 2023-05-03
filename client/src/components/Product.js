import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { StarRating } from "./StarRating";
import { ReviewContainer } from "./ReviewContainer";
import { UseProductContext } from "../context/useProductContext";
import { UseUserContext } from "../context/useUserContext";

export function Product(props) {
  //importing cartContext,dispath and info from the cartContext
  const productDispatch = UseProductContext().dispatch;

  const [showPopup, setShowPopup] = useState(false);

  const [handleOpenFrom, setHandleOpenFrom] = useState("");
  const handleViewProductClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [rating, setRating] = useState(0);

  //To get the rating when the review is submitted by the user
  const [addedRating, setAddedRating] = useState(3);

  const getRatingValue = (rating) => {
    setAddedRating(rating);
  };

  const [selectedProductID, setSelectedProductID] = useState("");
  const reviewDesc = useRef();

  const { getUser } = UseUserContext();
  const user = getUser();
  //To submit the user review
  // const submitProductReview = async (e) => {
  //   e.preventDefault();

  // const data = await addReviewProduct({
  //   productID: selectedProductID,
  //   rating: addedRating,
  //   review: reviewDesc.current.value,
  // });

  // if (data) {
  //   handleClosePopup();
  //   alert("Review added successfully!");

  //   productDispatch({
  //     type: "AddReview",
  //     payload: {
  //       _id: data._id,
  //       rating: addedRating,
  //       review: reviewDesc.current.value,
  //       userID: user._id,
  //       userName: user.userName,
  //     },
  //   });
  // }

  const [userCanReview, setUserCanReview] = useState(false);

  //To get the avg rating of each product based on all the customers rating
  useEffect(() => {
    if (props.details.reviews.length > 0) {
      const averageRating =
        props.details.reviews.reduce((total, rev) => total + rev.rating, 0) /
        props.details.reviews.length;
      setRating(averageRating);
    }
  }, [props.details.reviews]);

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
          <span>{props.details.storeName}</span>
          <h4>Rs. {props.details.price}</h4>
          {props.details.quantity ? (
            <span>{props.details.quantity} Available</span>
          ) : (
            <span style={{ textDecoration: "line-through", color: "red" }}>
              Sold Out
            </span>
          )}
          <div>
            {props.details.quantity ? (
              <>
                <button
                  title="View Product"
                  onClick={(e) => {
                    setHandleOpenFrom("View");
                    handleViewProductClick();
                  }}
                >
                  <FontAwesomeIcon icon={faExpand} />
                </button>

                <button
                  title="Review Product"
                  onClick={(e) => {
                    setHandleOpenFrom("Review");
                    setSelectedProductID(props.details._id);
                    handleViewProductClick();
                  }}
                >
                  <FontAwesomeIcon icon={faRankingStar} />
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {/* For the popup form */}
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
            {handleOpenFrom === "View" ? (
              <>
                <img
                  src={props.details.image}
                  alt={props.details.productName}
                />
                <StarRating initialRating={rating} fixedRating={true} />
                <h4 style={{ color: "black" }}>{props.details.productName}</h4>
                <h2 style={{ color: "black" }}>{props.details.storename}</h2>
                <h3>Reviews</h3>
                {props.details.reviews.map((rev) => {
                  return <ReviewContainer key={rev.userID} review={rev} />;
                })}{" "}
              </>
            ) : (
              <>
                <img
                  src={props.details.image}
                  alt={props.details.productName}
                />
                <StarRating initialRating={rating} fixedRating={true} />
                <h4 style={{ color: "black" }}>{props.details.productName}</h4>
                <h2 style={{ color: "black" }}>{props.details.storename}</h2>
                <div className="card-body">
                  <div className="review-box">
                    <div className="star-rating">
                      <StarRating
                        maxRating={5}
                        initialRating={0}
                        enterRating={getRatingValue}
                      />
                    </div>
                    <textarea
                      cols={30}
                      placeholder="Describe your experience..."
                      ref={reviewDesc}
                    ></textarea>
                    <button
                      className="btn btn-success"
                      onClick={(e) => {
                        // submitProductReview(e);
                      }}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
