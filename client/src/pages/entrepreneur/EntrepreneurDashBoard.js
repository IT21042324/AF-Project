import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPerson, faCubes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { UseUserContext } from "../../hooks/useUserContext";

export const EntrepreneurDashBoard = () => {
  const { logoutUser } = UseUserContext();

  const [mechantIsLoggedIn, setMerchantIsLoggedIn] = useState(true);

  // Use useEffect to logout user if merchantIsLoggedIn state changes
  useEffect(() => {
    if (!mechantIsLoggedIn) {
      // Call the logoutUser function from the context
      logoutUser();
    }
  }, [mechantIsLoggedIn]);

  const logoutFunction = () => {
    // Set merchantIsLoggedIn state to false
    setMerchantIsLoggedIn(false);

    // Show an alert to confirm the logout
    alert("Logged Out");
  };
  return (
    <div>
      {mechantIsLoggedIn ? (
        <>
          <div
            className="content-main"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h2>Notifications</h2>
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
              <div className="card card-body mb-4">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-primary-light">
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Impressions</h6>
                    <span>0</span>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card card-body mb-4">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-success-light">
                    <FontAwesomeIcon icon={faPerson} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Interested Parties</h6>
                    <span>0</span>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card card-body mb-4">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle bg-warning-light">
                    <FontAwesomeIcon icon={faCubes} />
                  </span>
                  <div className="text">
                    <h6 className="mb-1 card-title">Total Products</h6>
                    <span>0</span>
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
