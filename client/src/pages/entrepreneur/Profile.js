import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import pic from "../../assets/f1.png";
import { UseUserContext } from "../../hooks/useUserContext";
import { useEffect, useState } from "react";

export function Profile() {
  const { logoutUser, getUser } = UseUserContext();

  const user = getUser();

  const [mechantIsLoggedIn, setMerchantIsLoggedIn] = useState(true);

  // Use useEffect to logout user if merchantIsLoggedIn state changes
  useEffect(() => {
    if (!mechantIsLoggedIn) {
      // Call the logoutUser function from the context
      logoutUser();
    }
  }, [mechantIsLoggedIn]);

  // Define a function to logout the user
  const logoutFunction = () => {
    // Set merchantIsLoggedIn state to false
    setMerchantIsLoggedIn(false);

    // Show an alert to confirm the logout
    alert("Logged Out");
  };

  return (
    <div>
      <section className="main-wrap">
        <div
          className="content-main"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <h2>Your Profile</h2>
            <p>Manage Your profile here</p>
          </div>
          <div>
            <div>
              <input
                type="Button"
                className="btn btn-primary"
                onClick={(e) => logoutFunction()}
                value="Logout"
              />
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header bg-primary" style={{ height: 150 }}></div>
          <div className="card-body">
            <div className="row">
              <div
                className="col-xl col-lg flex-grow-0"
                style={{ flexBasis: 230 }}
              >
                <div
                  className="img-thumbnail shadow w-100 bg-white position-relative text-center"
                  style={{ height: 190, width: 200, marginTop: -120 }}
                >
                  <img
                    src={user.image}
                    className="img-thumbnail shadow w-100 bg-white position-relative text-center center-xy img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xl col-lg">
                <h3 style={{ color: "black" }}>About</h3>
                <p>{user.bio}</p>
              </div>
              <div className="col-xl-4 text-md-end">
                <Link
                  className="btn btn-success"
                  to={"/entrepreneurship/edit-profile"}
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </Link>
              </div>
            </div>
            <hr className="my-4" />
            <div
              className="row g-4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <h4>User Name</h4>
                <p>Email: {user.userName}</p>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <h4>Contact</h4>
                <p>Phone: {user.contact}</p>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <h4>Address</h4>
                <p>
                  Country: Sri Lanka <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
