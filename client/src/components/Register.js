import { Link } from "react-router-dom";
import pic from "../assets/register.png";
import { useState, useRef } from "react";
import { UseBackendAPI } from "../backendAPI/useBackendAPI";
import avatar from "../assets/addphoto.png";
import { EncodedFile } from "../assets/encodedImage";

export function Register() {
  const { registerUser } = UseBackendAPI();
  const [profilePic, setProfilePic] = useState(avatar);

  //Naming our refs to submit and store form data
  const userName = useRef(),
    password = useRef(),
    contact = useRef(),
    bio = useRef();

  //To set the user role

  //Function to convert image to base64 so that it can be stored in the database
  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setProfilePic(reader.result);
    reader.onerror = (error) => console.log("error: ", error);
  }

  const [accountType, setAccountType] = useState("");

  //To register Merchant
  async function signUpHandler(e) {
    e.preventDefault();

    var image;
    if (profilePic) image = profilePic;
    else image = EncodedFile().image;

    let bioValue;

    accountType === "Entrepreneur"
      ? (bioValue = bio.current.value)
      : (bioValue = "None");

    const signupData = {
      userName: userName.current.value,
      password: password.current.value,
      contact: contact.current.value,
      image: profilePic,
      role: accountType,
      bio: bioValue,
    };

    await registerUser(signupData);
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
          <form style={{ minWidth: 400 }} onSubmit={(e) => signUpHandler(e)}>
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
              <label>Account Type</label>
              <select
                className="form-control"
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="">Choose Account Type..</option>
                <option value="User">
                  User (For Event Bookings, Accomodations and viewings)
                </option>
                <option value="Entrepreneur">Entrepreneur</option>
              </select>
            </div>

            {accountType === "Entrepreneur" && (
              <div className="mb-3">
                <label>Tell Us About Yourself</label>
                <textarea
                  rows={5}
                  type="text"
                  className="form-control"
                  placeholder="I am a..."
                  ref={bio}
                  required
                />
              </div>
            )}

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
