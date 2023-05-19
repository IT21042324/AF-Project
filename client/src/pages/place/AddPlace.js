import React, { useState } from "react";
import axios from "axios";
import picture from "../../assets/placeMain.png";
import { useNavigate } from "react-router-dom";
import { validateForm } from "./AddPlaceValidations";

export function AddPlace() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [placeName, setName] = useState("");
  const [placeDescription, setDescription] = useState("");
  const [placeImage, setImage] = useState("");

  const navigate = useNavigate();

  //image
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //function for sending data
  function sendData(e) {
    e.preventDefault();

    //calling validation function
    if (!validateForm(placeName, placeDescription, imageUrl)) {
      return;
    }

    const newPlace = {
      placeName,
      placeDescription,
      imageUrl,
    };

    axios
      .post(`${backendUrl}/api/protectedPlace/add`, newPlace)
      .then(() => {
        alert("Place added");
        navigate("../allPlaces");
      })
      .catch((err) => {
        alert(err);
      });
  }

  //uploading the image
  const uploadImage = async (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setLoading(true);
    console.log(base64);
    axios
      .post(`${backendUrl}/uploadImage`, { image: base64 })
      .then((res) => {
        console.log(res.data);
        setImageUrl(res.data);

        //res.data
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  };

  return (
    <>
      <section className="main-dashboard">
        <table
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "5%" }}
        >
          <tr>
            <td>
              <div>
                <br></br>
                <form onSubmit={sendData}>
                  <h3 style={{ fontFamily: "cursive", color: "green" }}>
                    Add New Place
                  </h3>
                  <br></br>
                  <div className="mb-3">
                    <label htmlFor="placeName">Place Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="placeName"
                      placeholder="Enter Place Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="placeDescription">Place Description</label>
                    <textarea
                      style={{ height: 150 }}
                      class="form-control"
                      id="placeDescription"
                      placeholder="Enter Place Description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label for="placeImage">Place Image</label>
                    <input
                      type="file"
                      class="form-control"
                      id="placeImage"
                      onChange={uploadImage}
                    />
                  </div>
                  <button type="submit" class="btn btn-dark">
                    Add Place
                  </button>
                </form>
              </div>
            </td>
            <td>
              <div>
                <img src={picture} alt="" style={{ width: 400, height: 470 }} />
              </div>
            </td>
          </tr>
        </table>
      </section>
    </>
  );
}
