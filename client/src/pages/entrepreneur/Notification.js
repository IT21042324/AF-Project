import { useEffect, useState } from "react";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserContext } from "../../hooks/useUserContext";
import { UseProductContext } from "../../hooks/useProductContext";
import { EntrepreneurDashBoard } from "./EntrepreneurDashBoard";

export const Notification = () => {
  //Accessing necessary variables from the hooks
  const { products, dispatch } = UseProductContext();
  const { getUser } = UseUserContext();

  //getting the user
  const user = getUser();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(products);
  }, [products]);

  const { markAsRead } = UseBackendAPI();

  const setNotifcationAsRead = async (e, productID) => {
    e.preventDefault();

    const data = await markAsRead({ productID, role: user.role });

    if (data) dispatch({ type: "UpdateProduct", payload: data });
  };

  return (
    <section className="main-wrap">
      {/* If the merchant is logged in, display the dashboard */}
      <EntrepreneurDashBoard />

      <div className="card mb-4">
        <header className="card-header">
          <h4>All Notifications</h4>
        </header>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Message</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {product
                  .filter((itm) => itm.userID === user._id)
                  .map((data) => {
                    return (
                      <>
                        {data.discussion.map((discussion) => {
                          return (
                            <>
                              {discussion.sender === "User" && (
                                <tr key={discussion.time}>
                                  <td>You have a new notification from</td>
                                </tr>
                              )}
                            </>
                          );
                        })}

                        <tr key={data._id}>
                          <td>
                            Your Product, <b>{data.productName}</b>
                            {data.isApprovedByAdmin === "Approved"
                              ? ` has been approved by admin`
                              : data.isApprovedByAdmin === "Rejected"
                              ? ` has been rejected`
                              : ` is awaiting admin approval`}
                          </td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <button
                                type="button"
                                class="btn btn-success btn-sm"
                                disabled={data.markAsReadUser}
                                onClick={(e) =>
                                  setNotifcationAsRead(e, data._id)
                                }
                              >
                                {data.markAsReadUser ? "Seen" : "Mark As Read"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
