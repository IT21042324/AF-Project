import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faTruck,
  faUserGroup,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { UseUserContext } from "../../hooks/useUserContext";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserListContext } from "../../hooks/useUserListContext";
import { PopoverButton } from "../../components/PopoverButton";
import { UseProductContext } from "../../hooks/useProductContext";
import moment from "moment";

export function ProductRequestNotification() {
  const { logoutUser } = UseUserContext();
  const content = { som: [] };
  const userList = UseUserListContext().content;
  const userListDispatch = UseUserListContext().dispatch;

  //Destructuring necessary commponents from the admin context
  const { dashBoardDetails } = content;
  const dashDetails = dashBoardDetails;

  const [users, setUsers] = useState([]);
  // const [orderCount, setOrderCount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [userRole, setUserRole] = useState("");

  //setting the dashboard details
  useEffect(() => {
    // setOrderCount(dashDetails.orderCount);
    setAmount(0);
  }, []);

  //setting the users details
  useEffect(() => {
    setUsers(userList.users);
    setUserCount(users.length);
  }, [userList.users]);

  // Define a state variable to track admin's login status
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(true);

  //The function to logout
  const logoutFunction = () => {
    //To logout the user
    setAdminIsLoggedIn(false);
  };

  // Use useEffect to logout user if adminIsLoggedIn state changes
  useEffect(() => {
    if (!adminIsLoggedIn) {
      // Call the logoutUser function from the context
      logoutUser();
    }
  }, [adminIsLoggedIn]);

  const [product, setProduct] = useState([]);

  const { products } = UseProductContext();

  useEffect(() => {
    setProduct(products);
  }, [products]);
  const { acceptUserRequest, rejectUserRequest } = UseBackendAPI();

  const acceptRequest = async (e, userID) => {
    e.preventDefault();

    const data = await acceptUserRequest(userID);

    if (data) {
      userListDispatch({ type: "ApproveUser", payload: { _id: data._id } });
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [rejectionUserName, setRejectionFormUserName] = useState("");
  const [rejectionUserID, setRejectionFormUserID] = useState("");

  const handleClosePopup = (id) => {
    setShowPopup(false);
  };

  const rejectionReason = useRef();

  const rejectRequest = async (event) => {
    event.preventDefault();

    const data = await rejectUserRequest({
      userID: rejectionUserID,
      rejectionReason: rejectionReason.current.value,
    });

    if (data) {
      userListDispatch({ type: "RejectUser", payload: { _id: data._id } });
    }

    setShowPopup(false);
  };

  return (
    <section className="main-dashboard">
      {adminIsLoggedIn ? (
        <>
          <div
            className="content"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h2
                style={{
                  color: "Black",
                  fontWeight: "bold",
                  float: "left",
                }}
              >
                Product Notifications
              </h2>
              <br />
              <p
                style={{
                  color: "black",
                  float: "left",
                }}
              >
                Add/Reject Product Requests From Here..
              </p>
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
              <div className="card card-body mb-3">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-primary-light">
                    <FontAwesomeIcon icon={faDollarSign} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">User</h6>0
                  </div>
                </article>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="card card-body mb-3">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-success-dar">
                    <FontAwesomeIcon icon={faTruck} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Some Data</h6>
                    <span>0</span>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card card-body mb-3">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-warning-light">
                    <FontAwesomeIcon icon={faUserGroup} />
                  </span>
                  <div className="text">
                    <h6 className="mb-2 card-title">Some Data</h6>{" "}
                    <span>Some value</span>
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
                            User Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            style={{ textAlign: "center" }}
                            value={rejectionUserName}
                            ref={rejectionReason}
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
      ) : (
        <Navigate to="/" />
      )}
    </section>
  );
}
