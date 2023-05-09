import { useEffect, useState, useRef } from "react";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserListContext } from "../../hooks/useUserListContext";
import { PopoverButton } from "../../components/PopoverButton";
import { AdminDashBoardDetails } from "../../components/AdminDashBoardDetails";

export function UserRequestNotification() {
  const userList = UseUserListContext().content;
  const userListDispatch = UseUserListContext().dispatch;

  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("");

  //setting the users details
  useEffect(() => {
    setUsers(userList.users);
  }, [userList.users]);

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
      <AdminDashBoardDetails
        title={"User Request Notifications"}
        subTitle={"Handle All New User Requests from here"}
      />
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
                      <td style={{ textAlign: "center" }}>{usr.userName}</td>
                      <td style={{ textAlign: "center" }}>{usr.role}</td>
                      <td style={{ textAlign: "center" }}>{usr.contact}</td>

                      <td style={{ textAlign: "center" }}>
                        <PopoverButton
                          buttonName={"Read Bio"}
                          heading={"User Bio"}
                          displayText={usr.bio}
                          className="btn btn-primary"
                        />
                      </td>

                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {!usr.userIsRejectedByAdmin &&
                        !usr.userIsApprovedByAdmin ? (
                          <div>
                            <button
                              type="button"
                              class="btn btn-outline-success btn-sm"
                              title="Accept User Request"
                              onClick={(e) => acceptRequest(e, usr._id)}
                            >
                              Accept
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
                              Reject
                            </button>
                          </div>
                        ) : usr.userIsRejectedByAdmin &&
                          !usr.userIsApprovedByAdmin ? (
                          <h6 style={{ color: "#dc3545" }}>User Rejected</h6>
                        ) : !usr.userIsRejectedByAdmin &&
                          usr.userIsApprovedByAdmin ? (
                          <h6 style={{ color: "#198754" }}> User Approved</h6>
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
                      <label for="validationCustom01" style={{ float: "left" }}>
                        User Name
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
                      <label for="validationCustom01" style={{ float: "left" }}>
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
    </section>
  );
}
