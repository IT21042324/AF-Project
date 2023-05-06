import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/place.css";

export function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const [placeID, setPlaceID] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  // const [imageUrl, setUrl] = useState('')

  //function to display all the places
  useEffect(() => {
    function getPlaces() {
      axios
        .get("http://localhost:8070/api/place/")
        .then((res) => {
          setPlaces(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getPlaces();
  }, []);

  //function to get one place
  function getOnePlace(pid) {
    axios
      .get("http://localhost:8070/api/place/" + pid)
      .then((res) => {
        setPlaceID(res.data._id);
        setPlaceName(res.data.placeName);
        setPlaceDescription(res.data.placeDescription);
        setImageUrl(res.data.imageUrl);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const showUpdateBox = () => {
    document.getElementById("backdrop").style.display = "block";
  };

  const handleClose = () => {
    document.getElementById("backdrop").style.display = "none";
    setNewImageUrl("");
  };

  //Update place function
  function sendData(e) {
    e.preventDefault();

    let updateUrl;

    if (newImageUrl === "") {
      updateUrl = imageUrl;
    } else {
      updateUrl = newImageUrl;
    }

    const newPlace = {
      placeName,
      placeDescription,
      imageUrl: updateUrl,
    };

    const id = placeID;

    setNewImageUrl("");

    axios
      .patch("http://localhost:8070/api/protectedPlace/update/" + id, newPlace)
      .then(() => {
        alert("Place Details Updated");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  //delete place function
  function deletePlace(id) {
    axios
      .delete("http://localhost:8070/api/protectedPlace/delete/" + id)
      .then((res) => {
        alert("Place Deleted");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  //image
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

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
  //uploading the image
  const uploadImage = async (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setLoading(true);
    console.log(base64);
    axios
      .post("http://localhost:8070/uploadImage", { image: base64 })
      .then((res) => {
        console.log(res.data);
        setNewImageUrl(res.data);

        //res.data
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  };

  return (
    <>
    <section className="main-dashboard">
      <div class="container text-center">
        <div class="row">
          <h3
            style={{
              fontFamily: "cursive",
              color: "green",
              marginTop:"20px"
            }}
          >
            UPDATE / DELETE PLACES
          </h3>
          <br></br>
          <br></br>
          {places.map((place) => (
            <div class="col-12 col-md-6 col-lg-4">
              <div
                class="card"
                style={{
                  width: "20rem",
                  height: "35rem",
                  marginBottom: "40px"
                }}
              >
                <div class="card-image-area">
                  <img
                    src={place.imageUrl}
                    style={{
                      width: "80%",
                      height: "10rem",
                      margin: "0px auto",
                    }}
                    class="card-img-top"
                    alt="..."
                  ></img>
                  <div class="card-body">
                    <h6 class="card-title">Place ID: {place._id}</h6>
                    <h5 class="card-text">{place.placeName}</h5>
                    <div className="scroll-description">
                      <p style={{ textAlign: "left" }} class="card-text">
                        {place.placeDescription}
                      </p>
                    </div>
                    <br></br>
                    <button
                      type="button"
                      class="btn btn-dark"
                      style={{marginRight:"10px", padding: "10px 24px"}}
                      onClick={() => {
                        getOnePlace(place._id);
                        showUpdateBox();
                      }}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-dark"
                      style={{padding: "10px 24px"}}
                      onClick={() => {
                        deletePlace(place._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="backdrop" className="backdrop-black">
        <div
          id="update-box"
          className="container, form-style"
          style={{ position: "relative", marginLeft:"10%"}}
        >
          <br></br>
          <button
            onClick={handleClose}
            className="btn btn-outline-danger"
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "320px",
              top: "40px",
            }}
          >
            X
          </button>
          <form
            onSubmit={sendData}
            style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}
          >
            {/* <h3 style={{fontFamily: "cursive"}}>Update Place</h3> */}
            <table>
              <tr>
                <td>
                  <h3 style={{ fontFamily: "cursive" }}>Update Place</h3>
                  <br></br>
                  <div className="mb-3">
                    <label for="placeID">Place ID</label>
                    <input
                      type="text"
                      class="form-control"
                      id="placeID"
                      value={placeID}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label for="placeName">Place Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="placeName"
                      placeholder="Enter Place Name"
                      value={placeName}
                      onChange={(e) => {
                        setPlaceName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="placeDescription">Place Description</label>
                    {/* <input type="text" class="form-control" id="placeDescription" placeholder="Enter Place Description" value={placeDescription}
                                            onChange={(e) => {
                                                setPlaceDescription(e.target.value);
                                            }} /> */}
                    <textarea
                      style={{ height: 150 }}
                      class="form-control"
                      id="placeDescription"
                      placeholder="Enter Place Description"
                      value={placeDescription}
                      onChange={(e) => {
                        setPlaceDescription(e.target.value);
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
                    Update Place
                  </button>
                </td>
                <td>
                  <div>
                    <img
                      src={newImageUrl || imageUrl}
                      alt=""
                      style={{ width: 320, height: 400 }}
                    />
                  </div>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
      </section>
    </>
  );
}
