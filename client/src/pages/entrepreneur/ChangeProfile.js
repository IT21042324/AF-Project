import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { UseBackendAPI } from "../../backendAPI/useBackendAPI";
import { UseUserContext } from "../../hooks/useUserContext";

export function ChangeProfile() {
  const { getUser } = UseUserContext();
  const user = getUser();

  const { updateUserProfileDetails } = UseBackendAPI();

  // Setting initial state for the product picture as an empty string
  const [image, setProductPicture] = useState("");

  // Function for converting the selected image file to base64 format
  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setProductPicture(reader.result);
    reader.onerror = (error) => console.log("error: ", error);
  }

  const bio = useRef(),
    contact = useRef();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    await updateUserProfileDetails({
      bio: bio.current.value,
      contact: contact.current.value,
      image,
    });

    //To clear the form after submission
    // bio.current.value = "";
    // contact.current.value = "";
    // imageInputRef.current.value = "";
  };

  return (
    <div>
      <section className="main-wrap">
        <div
          className="content-main"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <h2 style={{ float: "left" }}>Customize Profile</h2>
            <br />
            <p style={{ float: "left" }}>Change Your Profile Details Here</p>
          </div>
          <div>
            <Link className="btn btn-primary" to={"/entrepreneurship/profile"}>
              Back
            </Link>
          </div>
        </div>

        <div className="card mb-4">
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <header className="card-header">
              <h4>Profile</h4>
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
                <div className="col-md-4 mb-3">
                  <label for="validationCustom01" style={{ float: "left" }}>
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Type here"
                    value={user.userName}
                    disabled
                    required
                  />
                </div>
                <div className="col">
                  <label for="validationCustom01" style={{ float: "left" }}>
                    BIO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Type here"
                    defaultValue={user.bio}
                    ref={bio}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label for="validationCustom01" style={{ float: "left" }}>
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    defaultValue={user.contact}
                    ref={contact}
                    pattern="[0-9]{10}"
                    minLength="10"
                    maxLength="10"
                    title="Please enter a 10-digit phone number"
                    required
                  />
                </div>
                <div className="col">
                  <label for="validationCustom01" style={{ float: "left" }}>
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="0.00"
                    onChange={(e) => convertToBase64(e)}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
