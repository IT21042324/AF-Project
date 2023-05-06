import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faTruck,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UseUserContext } from "../../hooks/useUserContext";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserListContext } from "../../hooks/useUserListContext";

export function AdminLandingPage() {
  const { logoutUser } = UseUserContext();
  const { deleteUser } = UseBackendAPI();
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

  const removeUser = async (e, userID) => {
    e.preventDefault();

    const data = await deleteUser(userID);

    if (data) {
      userListDispatch({ type: "DeleteUser", payload: { _id: data._id } });
    }
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
                }}
              >
                ADMIN DASHBOARD
              </h2>
              <p
                style={{
                  color: "black",
                }}
              >
                Manage Heavenly From Here
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
                    <h6 className="mb-1 card-title">Users</h6>0
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
              <h4>Users</h4>
              <select
                onChange={(e) => setUserRole(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              >
                <option value="">--Please select a user role--</option>
                <option value="">All</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="User">Other</option>
              </select>
            </header>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr style={{ textAlign: "center", height: "50px" }}>
                      <th>#User ID</th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        User Name
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Role
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Contact No
                      </th>
                      <th
                        scope="col"
                        className="text-end"
                        style={{ textAlign: "center" }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  {users
                    .filter(
                      (usr) =>
                        (userRole === "" || usr.role === userRole) &&
                        usr.role !== "Admin" &&
                        usr.userIsApprovedByAdmin
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
                            <button
                              onClick={(e) => removeUser(e, usr._id)}
                              title="Permanently Remove User"
                              style={{
                                padding: "8px 12px",
                                borderRadius: "4px",
                                border: "none",
                                fontSize: "16px",
                                fontFamily: "sans-serif",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                color: "#ff4d4f",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                float: "right",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#f1f1f1")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#fff")
                              }
                            >
                              Remove User
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
