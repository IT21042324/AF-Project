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

export function EntrepreneurLandingPage() {
  //Accessing necessary variables from the hooks
  const { products, dispatch } = UseProductContext();
  const { getUser, logoutUser } = UseUserContext();

  //getting the user
  const user = getUser();

  // Define a state variable to track merchant's login status
  const [mechantIsLoggedIn, setMerchantIsLoggedIn] = useState(true);
  const [product, setProduct] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Setting initial state for the product picture as an empty string
  const [image, setProductPicture] = useState("");

  // Function for converting the selected image file to base64 format
  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setProductPicture(reader.result);
    reader.onerror = (error) => console.log("error: ", error);
  }

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

  const handleClosePopup = (id) => {
    setShowPopup(false);
  };

  //Updating Prodcut Logic
  const { updateProductDetails, removeProductDetails } = UseBackendAPI();

  const productName = useRef(),
    description = useRef(),
    quantity = useRef(),
    price = useRef();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const data = await updateProductDetails({
      productID: editFormData.productID,
      productName: productName.current.value,
      description: description.current.value,
      price: price.current.value,
      quantity: quantity.current.value,
      image,
    });

    console.log(data);

    dispatch({ type: "UpdateProduct", payload: data });

    setShowPopup(false);
  };

  const [editFormData, setEditFormData] = useState({});

  const passDataToEditForm = (info) => {
    setEditFormData(info);
  };

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
              <h2>Entrepreneur Corner</h2>
              <p>All you show cased products can be managed from here</p>
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
              <h4>Approved Products</h4>

              <Link
                className="btn btn-success"
                to={"/entrepreneurship/add-product"}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Product
              </Link>
            </header>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Product ID</th>
                      <th scope="col">Image</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Discussions</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product
                      .filter(
                        (itm) =>
                          itm.userID === user._id && itm.isApprovedByAdmin
                      )
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
                            <td>{data.productName}</td>
                            <td>Rs. {data.price.toFixed(2)}</td>
                            <td>
                              {data.isApprovedByAdmin === "Pending" ? (
                                "Product Awaiting Admin Approval"
                              ) : data.isApprovedByAdmin === "Approved" &&
                                data.discussion.length !== 0 ? (
                                <Link>View Discussions</Link>
                              ) : (
                                "No Discussion Threads found for this product"
                              )}
                            </td>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <button
                                  style={{
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={(e) => {
                                    passDataToEditForm({
                                      productID: data._id,
                                      productName: data.productName,
                                      quantity: data.quantity,
                                      description: data.description,
                                      price: data.price,
                                    });
                                    setShowPopup(true);
                                  }}
                                  title="Modify Product Details"
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>

                                <button
                                  style={{
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={(e) => removeProduct(e, data._id)}
                                  title="Remove Product"
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

                        <div className="row">
                          <div className="col">
                            <label
                              for="validationCustom01"
                              style={{ float: "left" }}
                            >
                              Image
                            </label>
                            <input
                              type="file"
                              title="select a suitable product image"
                              className="form-control"
                              id="validationCustom01"
                              onChange={(e) => convertToBase64(e)}
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
}
