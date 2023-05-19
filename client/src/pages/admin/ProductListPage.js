import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import moment from "moment";

import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseProductContext } from "../../hooks/useProductContext";
import { AdminDashBoardDetails } from "../../components/AdminDashBoardDetails";

export function ProductListPage() {
  //Accessing necessary variables from the hooks
  const { products, dispatch } = UseProductContext();

  // Define a state variable to track merchant's login status
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(products);
  }, [products]);

  const { removeProductDetails } = UseBackendAPI();

  const removeProduct = async (e, itemID) => {
    e.preventDefault();

    const alertResponse = window.confirm("Are you sure you want to delete?");
    if (alertResponse !== true) return;

    const data = await removeProductDetails(itemID);

    if (data) {
      dispatch({ type: "RemoveProduct", payload: data._id });
    }
  };

  return (
    <section className="main-wrap">
      <AdminDashBoardDetails
        title={"Manage Products"}
        subTitle={"Manage All Display Products from Here"}
      />
      <div className="card mb-4">
        <header className="card-header">
          <h4 style={{ color: "black" }}>Product Requests</h4>
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
                              onClick={(e) => removeProduct(e, data._id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: "red" }}
                              />
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
      </div>
    </section>
  );
}
