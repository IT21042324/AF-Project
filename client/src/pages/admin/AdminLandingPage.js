import { useEffect, useState } from "react";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserListContext } from "../../hooks/useUserListContext";
import { AdminDashBoardDetails } from "../../components/AdminDashBoardDetails";

export function AdminLandingPage() {
  const { deleteUser } = UseBackendAPI();

  const userList = UseUserListContext().content;
  const userListDispatch = UseUserListContext().dispatch;

  const [users, setUsers] = useState([]);
  // const [orderCount, setOrderCount] = useState(0);
  const [userRole, setUserRole] = useState("");

  //setting the users details
  useEffect(() => {
    setUsers(userList.users);
  }, [userList.users]);

  const removeUser = async (e, userID) => {
    e.preventDefault();

    const data = await deleteUser(userID);

    if (data) {
      userListDispatch({ type: "DeleteUser", payload: { _id: data._id } });
    }
  };

  return (
    <section className="main-dashboard">
      <AdminDashBoardDetails
        title={"Manage Users"}
        subTitle={"Manage All Heavenly Users from Here"}
      />
      <div className="card mb-4">
        <header className="card-header">
          <h4>Accepted Users</h4>
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
                      <td style={{ textAlign: "center" }}>{usr.userName}</td>
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
    </section>
  );
}
