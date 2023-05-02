import { Link } from "react-router-dom";
import pic from "../assets/login.png";
import { useRef } from "react";
import { NavBar } from "./NavBar";
import { useState } from "react";

export function Login() {
  //Creating refs to hold values of login form values
  const userName = useRef();
  const password = useRef();

  const [isAdmin, setIsAdmin] = useState(false);

  const validateForm = () => {
    if (userName.current.value.trim() === "") {
      return "Username is required";
    }
    if (password.current.value.trim() === "") {
      return "Password is required";
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
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
          <form onSubmit={loginHandler}>
            <h3 className="text-center mb-4">
              {isAdmin ? "Welcome Admin" : "Sign In"}
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
              />
            </div>
            <div className="d-grid">
              <input
                type="submit"
                className="btn btn-primary"
                value="Sign In"
              />
            </div>
            {!isAdmin ? (
              <>
                <p className="forgot-password text-center">
                  Don't have an account yet?
                  <Link to={"/register"} onClick={(e) => {}}>
                    Register Now
                  </Link>
                </p>

                <p className="forgot-password text-center">
                  <Link onClick={(e) => setIsAdmin(true)}>admin?</Link>
                </p>
              </>
            ) : (
              <Link onClick={(e) => setIsAdmin(false)}>user?</Link>
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
