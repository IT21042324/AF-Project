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
import { Navigate } from "react-router-dom";
import moment from "moment";

import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserContext } from "../../hooks/useUserContext";
import { UseProductContext } from "../../hooks/useProductContext";

export function ProductListPage() {
  //Accessing necessary variables from the hooks
  const { products, dispatch } = UseProductContext();
  const { logoutUser } = UseUserContext();

  //getting the user

  // Define a state variable to track merchant's login status
  const [mechantIsLoggedIn, setMerchantIsLoggedIn] = useState(true);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(products);
  }, [products]);

  // Use useEffect to logout user if merchantIsLoggedIn state changes
  useEffect(() => {
    if (!mechantIsLoggedIn) {
      // Call the logoutUser function from the context
      logoutUser();
    }
  }, [mechantIsLoggedIn]);

  const { removeProductDetails } = UseBackendAPI();

  const removeProduct = async (e, itemID) => {
    e.preventDefault();

    const data = await removeProductDetails(itemID);

    if (data) {
      dispatch({ type: "RemoveProduct", payload: data._id });
    }
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
              <h2 style={{ float: "left" }}>Product Details</h2>
              <br />
              <p style={{ float: "left" }}>View All Products From Here</p>
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
              <h4>Product Requests</h4>
            </header>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Product ID</th>
                      <th scope="col">Image</th>
                      <th scope="col">Posted By</th>
                      <th scope="col">Price</th>
                      <th scope="col">Item Posted</th>
                      <th scope="col">Last Modified</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product
                      .filter((itm) => itm.isApprovedByAdmin)
                      .map((data) => {
                        return (
                          <tr key={data._id}>
                            <td scope="col">{data._id.slice(-4)}</td>
                            <td>
                              <img
                                src={data.image}
                                style={{ height: "50px", width: "50px" }}
                              />
                            </td>
                            <td>{data.userName}</td>
                            <td>Rs. {data.price.toFixed(2)}</td>
                            <td>{moment(data.createdAt).fromNow()}</td>
                            <td>{moment(data.updatedAt).fromNow()}</td>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <button
                                  title="Delete Item"
                                  style={{
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={(e) => removeProduct(e, data._id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </section>
  );
}
