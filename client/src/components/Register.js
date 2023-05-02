import { Link } from "react-router-dom";
import pic from "../assets/register.png";
import { useState, useRef } from "react";
import avatar from "../assets/addphoto.png";
import { EncodedFile } from "../assets/encodedImage";
import { NavBar } from "./NavBar";

export function Register() {
  const [profilePic, setProfilePic] = useState(avatar);

  //Naming our refs to submit and store form data
  const userName = useRef();
  const password = useRef();
  const contact = useRef();
  const address = useRef();

  //Function to convert image to base64 so that it can be stored in the database
  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setProfilePic(reader.result);
    reader.onerror = (error) => console.log("error: ", error);
  }

  //To register Merchant
  async function registerMerchant() {
    var image;
    if (profilePic) image = profilePic;
    else image = EncodedFile().image;

    const selectedUserRole = "";

    const dataToSave = {
      userName: userName.current.value,
      password: password.current.value,
      contact: contact.current.value,
      address: address.current.value,
      image: profilePic,
      role: selectedUserRole,
    };
  }

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
        <div>
          <img src={pic} alt="" style={{ width: 300, height: 300 }} />
        </div>
        <div className="login-c">
          <form
            style={{ minWidth: 400 }}
            onSubmit={(e) => {
              e.preventDefault();
              registerMerchant();
            }}
          >
            <h3 className="text-center mb-4">Sign Up</h3>

            <div
              className="mb-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label htmlFor="avatar">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt=""
                    style={{ width: "170px", height: "170px" }}
                  />
                ) : (
                  <img
                    src={avatar}
                    alt=""
                    style={{ width: "170px", height: "170px" }}
                  />
                )}
              </label>
              <input
                id="avatar"
                type="file"
                className="form-control"
                onChange={(e) => convertToBase64(e)}
                style={{ display: "none" }}
              />
            </div>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="email"
                className="form-control"
                placeholder="example@gmail.com"
                ref={userName}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
                required
              />
            </div>
            <div className="mb-3">
              <label>Create Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                ref={password}
                minLength="6"
                maxLength="20"
                required
              />
            </div>
            <div className="mb-3">
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="+94 123 456 789"
                ref={contact}
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
                minLength="10"
                maxLength="10"
                required
              />
            </div>
            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="123 Main St"
                ref={address}
                required
              />
            </div>
            <div className="d-grid">
              <input
                type="submit"
                className="btn btn-primary"
                value="Sign Up"
              />
            </div>
            <p className="forgot-password text-center">
              Already a member? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
