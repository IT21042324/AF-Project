import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faHeart,
  faPerson,
  faPlus,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserContext } from "../../hooks/useUserContext";
import { UseProductContext } from "../../hooks/useProductContext";

export const Notification = () => {
  //Accessing necessary variables from the hooks
  const { products, dispatch } = UseProductContext();
  const { getUser, logoutUser } = UseUserContext();

  //getting the user
  const user = getUser();

  // Define a state variable to track merchant's login status
  const [mechantIsLoggedIn, setMerchantIsLoggedIn] = useState(true);
  const [product, setProduct] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setProduct(products);
  }, [products]);

  const [notificationData, setNotificationData] = useState([]);

  const productName = useRef(),
    description = useRef(),
    quantity = useRef(),
    price = useRef();

  // Use useEffect to logout user if merchantIsLoggedIn state changes
  useEffect(() => {
    if (!mechantIsLoggedIn) {
      // Call the logoutUser function from the context
      logoutUser();
    }
  }, [mechantIsLoggedIn]);

  const handleClosePopup = (id) => {
    setShowPopup(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    setShowPopup(false);
  };

  const [editFormData, setEditFormData] = useState({});
  const [productID, setProductID] = useState("");

  const passDataToEditForm = (info) => {
    setEditFormData(info);
    setProductID(info.productID);
  };

  // Define a function to logout the user
  const logoutFunction = () => {
    // Set merchantIsLoggedIn state to false
    setMerchantIsLoggedIn(false);

    // Show an alert to confirm the logout
    alert("Logged Out");
  };

  return (
    <section className="main-wrap">
      {/* If the merchant is logged in, display the dashboard */}
      {mechantIsLoggedIn ? (
        <>
          <div
            className="content-main"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h2>Notifications</h2>
            </div>
            <div>
              <input
                type="Button"
                className="btn btn-primary"
                onClick={(e) => logoutFunction()}
                value="Logout"
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-3">
              <div className="card card-body mb-4">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-primary-light">
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Impressions</h6>
                    <span>0</span>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card card-body mb-4">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-success-light">
                    <FontAwesomeIcon icon={faPerson} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Interested Parties</h6>
                    <span>0</span>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card card-body mb-4">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-warning-light">
                    <FontAwesomeIcon icon={faCubes} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Total Products</h6>
                    <span>0</span>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <header className="card-header">
              <h4>All Notifications</h4>
            </header>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Message</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product
                      .filter((itm) => itm.userID === user._id)
                      .map((data) => {
                        return (
                          <>
                            {data.discussion.map((discussion) => {
                              return (
                                <>
                                  {discussion.sender === "User" && (
                                    <tr key={discussion.time}>
                                      <td>You have a new notification from</td>
                                    </tr>
                                  )}
                                </>
                              );
                            })}

                            <tr key={data._id}>
                              <td>
                                Your Product, <b>{data.productName}</b>
                                {data.isApprovedByAdmin === "Approved"
                                  ? ` has been approved by admin`
                                  : data.isApprovedByAdmin === "Rejected"
                                  ? ` has been rejected`
                                  : ` is awaiting admin approval`}
                              </td>
                              <td>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  {!data.markAsRead && (
                                    <button
                                      type="button"
                                      class="btn btn-success btn-sm"
                                    >
                                      Mark As Read
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
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
                  <div className="card mb-4">
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                      <header className="card-header">
                        <h4>Product</h4>
                        <div>
                          <input
                            className="btn btn-success"
                            type="submit"
                            value="Submit"
                          />
                        </div>
                      </header>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label
                              for="validationCustom01"
                              style={{ float: "left" }}
                            >
                              Product title
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              placeholder="Type here"
                              ref={productName}
                              defaultValue={editFormData.productName}
                              required
                            />
                          </div>
                          <div className="col">
                            <label
                              for="validationCustom01"
                              style={{ float: "left" }}
                            >
                              Product description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              placeholder="Type here"
                              ref={description}
                              defaultValue={editFormData.description}
                              required
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label
                              for="validationCustom01"
                              style={{ float: "left" }}
                            >
                              Quantity
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="validationCustom01"
                              placeholder="0"
                              ref={quantity}
                              defaultValue={editFormData.quantity}
                              required
                            />
                          </div>

                          <div className="col">
                            <label
                              for="validationCustom01"
                              style={{ float: "left" }}
                            >
                              Price
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              placeholder="0.00"
                              ref={price}
                              defaultValue={editFormData.price}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </section>
  );
};
