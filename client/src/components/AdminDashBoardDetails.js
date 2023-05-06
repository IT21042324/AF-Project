import { useState, useEffect } from "react";
import { UseUserContext } from "../hooks/useUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faTruck,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { UseUserListContext } from "../hooks/useUserListContext";

export const AdminDashBoardDetails = () => {
  const content = { som: [] };

  const { dashBoardDetails } = content;
  const dashDetails = dashBoardDetails;
  const userListDispatch = UseUserListContext().dispatch;

  const { logoutUser } = UseUserContext();
  const userList = UseUserListContext().content;

  // Define a state variable to track admin's login status
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(true);

  const [amount, setAmount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [users, setUsers] = useState([]);

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

  // Use useEffect to logout user if adminIsLoggedIn state changes
  useEffect(() => {
    if (!adminIsLoggedIn) {
      // Call the logoutUser function from the context
      logoutUser();
    }
  }, [adminIsLoggedIn]);

  //The function to logout
  const logoutFunction = () => {
    //To logout the user
    setAdminIsLoggedIn(false);
  };

  return (
    <div>
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
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};
