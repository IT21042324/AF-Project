import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faTruck,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { UseUserContext } from "../../hooks/useUserContext";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserListContext } from "../../hooks/useUserListContext";
import { PopoverButton } from "../../components/PopoverButton";
export function UserRequestNotification() {
  const { logoutUser } = UseUserContext();
  // const { content } = useAdminContext();
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
                User Notifications
              </h2>
              <br />
              <p
                style={{
                  color: "black",
                  float: "left",
                }}
              >
                Add/Reject Users from here
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
              <h4>Users Requests</h4>
            </header>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr style={{ textAlign: "center", height: "50px" }}>
                      <th>#Request ID</th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        User Name
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Role
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Contact No
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Bio
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  {users
                    .filter(
                      (usr) =>
                        (userRole === "" || usr.role === userRole) &&
                        usr.role !== "Admin"
                    )
                    .map((usr) => {
                      return (
                        <tr
                          key={usr._id}
                          style={{ textAlign: "center", height: "50px" }}
                        >
                          <td style={{ textAlign: "center" }}>
                            {usr._id.slice(-4)}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {usr.userName}
                          </td>
                          <td style={{ textAlign: "center" }}>{usr.role}</td>
                          <td style={{ textAlign: "center" }}>{usr.contact}</td>

                          <td style={{ textAlign: "center" }}>
                            <PopoverButton
                              buttonName={"Read Bio"}
                              heading={"User Bio"}
                              displayText={usr.bio}
                            />
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {!usr.userIsRejectedByAdmin &&
                            !usr.userIsApprovedByAdmin ? (
                              <>
                                <button
                                  type="button"
                                  class="btn btn-outline-success btn-sm"
                                  title="Accept User Request"
                                  onClick={(e) => acceptRequest(e, usr._id)}
                                >
                                  Accept User
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <button
                                  type="button"
                                  class="btn btn-outline-danger btn-sm"
                                  title="Reject User Request"
                                  onClick={(e) => {
                                    setRejectionFormUserName(usr.userName);
                                    setRejectionFormUserID(usr._id);
                                    setShowPopup(true);
                                  }}
                                >
                                  Reject User
                                </button>
                              </>
                            ) : usr.userIsRejectedByAdmin &&
                              !usr.userIsApprovedByAdmin ? (
                              <h6 style={{ color: "#dc3545" }}>
                                User Rejected
                              </h6>
                            ) : !usr.userIsRejectedByAdmin &&
                              usr.userIsApprovedByAdmin ? (
                              <h6 style={{ color: "#198754" }}>
                                {" "}
                                User Approved
                              </h6>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
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
