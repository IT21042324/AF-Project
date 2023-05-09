import { useState, useEffect } from "react";
import { UseUserContext } from "../hooks/useUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { UseProductContext } from "../hooks/useProductContext";
import { UseUserListContext } from "../hooks/useUserListContext";

export const AdminDashBoardDetails = () => {
  const { logoutUser } = UseUserContext();
  const userList = UseUserListContext().content.users;
  const { products } = UseProductContext();

  // Define a state variable to track admin's login status
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(true);

  const [approvedUserCount, setApprovedUserCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [productsOnDisplayCount, setProductsOnDisplayCount] = useState(0);

  useEffect(() => {
    setUserCount(userList.length);
    setApprovedUserCount(
      userList.filter((rec) => rec.userIsApprovedByAdmin).length
    );
    setProductsOnDisplayCount(
      products.filter((prod) => prod.productIsApprovedByAdmin).length
    );
  }, []);

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
                    <FontAwesomeIcon icon={faUserGroup} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">User Requests</h6>
                    <span>{userCount - 1}</span>
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
                    <h6 className="mb-1 card-title">Products on Display</h6>
                    <span>{productsOnDisplayCount}</span>
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
                    <h6 className="mb-1 card-title">Approved Users</h6>
                    <span>{approvedUserCount - 1}</span>
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
