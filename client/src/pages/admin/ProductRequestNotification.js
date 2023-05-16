import { useEffect, useState, useRef } from "react";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { PopoverButton } from "../../components/PopoverButton";
import { UseProductContext } from "../../hooks/useProductContext";
import { AdminDashBoardDetails } from "../../components/AdminDashBoardDetails";

export function ProductRequestNotification() {
  const [product, setProduct] = useState([]);

  const { products, dispatch } = UseProductContext();

  useEffect(() => {
    setProduct(products);
  }, [products]);

  const { acceptProductRequest, rejectProductRequest } = UseBackendAPI();

  const acceptRequest = async (e, productID) => {
    e.preventDefault();

    const data = await acceptProductRequest(productID);

    if (data) dispatch({ type: "ApproveProduct", payload: { _id: data._id } });
  };

  const [showPopup, setShowPopup] = useState(false);
  const [rejectionUserName, setRejectionFormUserName] = useState("");
  const [rejectionProductID, setRejectionFormProductID] = useState("");
  const [rejectionProductName, setRejectionFormProductName] = useState("");

  const handleClosePopup = (id) => {
    setShowPopup(false);
  };

  const rejectionReason = useRef();

  const rejectRequest = async (event) => {
    event.preventDefault();

    const data = await rejectProductRequest({
      productID: rejectionProductID,
      rejectionReason: rejectionReason.current.value,
    });

    if (data) dispatch({ type: "RejectProduct", payload: { _id: data._id } });

    setShowPopup(false);
  };

  return (
    <section className="main-dashboard">
      <AdminDashBoardDetails
        title={"Product Request Notifications"}
        subTitle={"Handle All New Product Requests from here"}
      />
      <>
        <div className="card mb-4">
          <header className="card-header">
            <h4>Product Requests</h4>
          </header>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Request ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Value</th>
                    <th scope="col">Posted By</th>
                    <th scope="col">Product Description</th>
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
                          <td>Rs. {data.price.toFixed(2)}</td>
                          <td>{data.userName}</td>
                          <td>
                            <PopoverButton
                              buttonName={"View"}
                              heading={"Product Description"}
                              displayText={data.description}
                            />
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {!data.productIsRejectedByAdmin &&
                            !data.productIsApprovedByAdmin ? (
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-outline-success btn-sm"
                                  title="Accept Product Request"
                                  onClick={(e) => acceptRequest(e, data._id)}
                                >
                                  Accept
                                </button>
                                <br />
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  title="Reject Product Request"
                                  onClick={(e) => {
                                    setRejectionFormUserName(data.userName);
                                    setRejectionFormProductID(data._id);
                                    setRejectionFormProductName(
                                      data.productName
                                    );
                                    setShowPopup(true);
                                  }}
                                >
                                  Reject
                                </button>
                              </div>
                            ) : data.productIsRejectedByAdmin &&
                              !data.productIsApprovedByAdmin ? (
                              <h6 style={{ color: "#dc3545" }}>
                                Product Rejected
                              </h6>
                            ) : !data.productIsRejectedByAdmin &&
                              data.productIsApprovedByAdmin ? (
                              <h6 style={{ color: "#198754" }}>
                                Product Approved
                              </h6>
                            ) : null}
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
                  <form onSubmit={(e) => rejectRequest(e)}>
                    <header className="card-header">
                      <h4>User Rejection Form</h4>
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
                        <label
                          for="validationCustom01"
                          style={{ float: "left" }}
                        >
                          Product
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          style={{ textAlign: "center" }}
                          value={rejectionProductName}
                          disabled={true}
                        />
                      </div>
                      <br />

                      <div className="row">
                        <label
                          for="validationCustom01"
                          style={{ float: "left" }}
                        >
                          Posted By
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          style={{ textAlign: "center" }}
                          value={rejectionUserName}
                          disabled={true}
                        />
                      </div>
                      <br />

                      <div className="row">
                        <label
                          for="validationCustom01"
                          style={{ float: "left" }}
                        >
                          Reason For Rejection
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          rows={5}
                          ref={rejectionReason}
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </section>
  );
}
