import { Link } from "react-router-dom";
import pic from "../assets/login.png";
import { useRef, useState } from "react";
import { UseBackendAPI } from "../backendAPI/useBackendAPI";
import { UseUserContext } from "../hooks/useUserContext";

export function Login(e) {
  const { login } = UseBackendAPI();

  const { dispatch } = UseUserContext();

  //Creating refs to hold values of login form values
  const userName = useRef(),
    password = useRef();

  const [isSeller, setIsSeller] = useState(false);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    await login({
      userName: userName.current.value,
      password: password.current.value,
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div className="login-c">
          <form onSubmit={(e) => loginSubmitHandler(e)}>
            <h3 className="text-center mb-4">
              {isSeller ? "Entrepreneur Login" : "User Login"}
            </h3>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="email"
                className="form-control"
                placeholder="example@gmail.com"
                ref={userName}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                ref={password}
                required
              />
            </div>
            <div className="d-grid">
              <input
                type="submit"
                className="btn btn-primary"
                value="Sign In"
              />
            </div>

            <p className="forgot-password text-center">
              Don't have an account yet?
              <Link
                to={"/register"}
                onClick={(e) => {
                  {
                    isSeller
                      ? dispatch({
                          type: "SetSelectedUserRole",
                          payload: "Entrepreneur",
                        })
                      : dispatch({
                          type: "SetSelectedUserRole",
                          payload: "User",
                        });
                  }
                }}
              >
                Register As {isSeller ? "Entrepreneur" : "User"}
              </Link>
            </p>
            {!isSeller ? (
              <p className="forgot-password text-center">
                <Link
                  onClick={(e) => {
                    setIsSeller(true);

                    dispatch({
                      type: "SetSelectedUserRole",
                      payload: "Entrepreneur",
                    });
                  }}
                >
                  entrepreneur?
                </Link>
              </p>
            ) : (
              <p className="forgot-password text-center">
                <Link
                  onClick={(e) => {
                    setIsSeller(false);
                    dispatch({ type: "SetSelectedUserRole", payload: "User" });
                  }}
                >
                  user?
                </Link>
              </p>
            )}
          </form>
        </div>
        <div>
          <img src={pic} alt="" style={{ width: 300, height: 300 }} />
        </div>
      </div>
    </div>
  );
}
