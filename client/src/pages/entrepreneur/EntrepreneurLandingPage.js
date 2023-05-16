import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserContext } from "../../hooks/useUserContext";
import { UseProductContext } from "../../hooks/useProductContext";
import { EntrepreneurDashBoard } from "./EntrepreneurDashBoard";

export function EntrepreneurLandingPage() {
  //Accessing necessary variables from the hooks
  const { products, dispatch } = UseProductContext();
  const { getUser } = UseUserContext();

  //getting the user
  const user = getUser();

  // Define a state variable to track merchant's login status
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

  return (
    <section className="main-wrap">
      {/* If the merchant is logged in, display the dashboard */}
      <EntrepreneurDashBoard
        title={"Approved Products"}
        subTitle={"Checkout All Your Approved Products From Here"}
      />

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
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {product
                  .filter(
                    (itm) => itm.userID === user._id && itm.isApprovedByAdmin
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
                          {data.isApprovedByAdmin === "Pending"
                            ? "Product Awaiting Admin Approval"
                            : "Product Approved"}
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <button
                              style={{
                                border: "none",
                                background: "none",
                                color: "black",
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
                                color: "red",
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
    </section>
  );
}
