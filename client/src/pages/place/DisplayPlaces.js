import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import cover from "../../assets/PlaceCoverPic.jpg";
import "../../styles/place.css";

export function DisplayPlaces() {
  const [places, setPlaces] = useState([]);
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [placeName, setPlaceName] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [noResults, setNoResults] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("none");

  //function to display all the items
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

  //Search places
  const searchPlaces = async (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:8070/api/place/search/${searchTerm}`)
      .then((res) => {
        setSearchResults(res.data);
        if (res.data.length < 1) {
          setNoResults("No Results Found");
          setErrorDisplay("block");
        } else {
          setNoResults("");
          setErrorDisplay("none");
        }
      })
      .catch((err) => {
        setNoResults("");
        setErrorDisplay("none");
        setSearchResults([]);
        console.log(err);
      });
  };

  const showUpdateBox = () => {
    document.getElementById("backdropPlace").style.display = "block";
  };

  const handleClose = () => {
    document.getElementById("backdropPlace").style.display = "none";
    setNewImageUrl("");
  };

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

  //function to get one place
  function getOnePlace(pid) {
    axios
      .get("http://localhost:8070/api/place/" + pid)
      .then((res) => {
        setPlaceName(res.data.placeName);
        setPlaceDescription(res.data.placeDescription);
        setImageUrl(res.data.imageUrl);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

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

    setNewImageUrl("");
  }

  return (
    <>
      <div
        className="place-header"
        style={{
          display: "flex",
          width: "100%",
          height: "300px",
          overflow: "hidden",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={cover}
          style={{ display: "flex", width: "100%", filter: "brightness(50%)" }}
        />
        <div
          style={{
            position: "absolute",
            color: "white",
            fontSize: "128px",
            textAlign: "center",
          }}
        >
          <span>HEAVENLY</span>
          <div
            style={{
              color: "white",
              fontSize: "48px",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Explore the Beauty of Sri Lanka
          </div>
        </div>
      </div>
      <br />

      {/* Search bar */}
      <form
        style={{
          backgroundColor: "transparent",
          border: "0",
          marginLeft: "20px",
          margintop: "0",
          padding: "0",
        }}
        role="search"
        onSubmit={searchPlaces}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search Places"
          aria-label="Search"
          style={{ width: "20%" }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </form>
      <br></br>

      {/* Displaying search items */}

      <div className="container text-center">
        <div
          style={{
            color: "red",
            backgroundColor: "rgba(255,0,0,0.2)",
            padding: "10px 0",
            border: "1px solid #ff0000",
            borderRadius: "5px",
            display: errorDisplay,
          }}
        >
          {noResults}
        </div>
        <div className="row">
          {searchResults.map((place) => (
            <div
              className="card"
              key={place._id}
              style={{
                width: "19rem",
                height: "35rem",
                marginBottom: "50px",
                marginLeft: "40px",
              }}
            >
              <div className="card-image-area">
                <img
                  src={place.imageUrl}
                  style={{ width: "80%", height: "10rem", margin: "0px auto" }}
                  className="card-img-top"
                  alt="..."
                ></img>
                <div className="card-body">
                  {/* <h5 className="card-title">Item ID: {item._id}</h5> */}
                  <h5 className="card-text">{place.placeName}</h5>
                  <div className="scroll-description-user">
                    <p style={{ textAlign: "left" }} className="card-text">
                      {place.placeDescription}
                    </p>
                  </div>
                  {/* <button type="button" className="btn btn-success">Button</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display all items */}
      <div className="container text-center">
        <br></br>
        <div className="row">
          {places.map((place) => (
            <div className="col-12 col-md-6 col-lg-3" key={place._id}>
              <div
                className="card"
                style={{
                  width: "18rem",
                  height: "39rem",
                  marginBottom: "40px",
                }}
              >
                <div className="card-image-area">
                  <img
                    src={place.imageUrl}
                    style={{
                      width: "80%",
                      height: "10rem",
                      margin: "0px auto",
                    }}
                    className="card-img-top"
                    alt="..."
                  ></img>
                  <div className="card-body">
                    {/* <h5 className="card-title">Item ID: {item._id}</h5> */}
                    <h5 className="card-text"> {place.placeName}</h5>
                    <div className="scroll-description-user">
                      <p style={{ textAlign: "left" }} className="card-text">
                        {place.placeDescription}
                      </p>
                    </div>
                    <br />
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      style={{ padding: "10px 24px" }}
                      onClick={() => {
                        getOnePlace(place._id);
                        showUpdateBox();
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View */}
      <div id="backdropPlace" className="backdropPlace-black">
        <div
          //id="update-box"
          className="container"
          style={{ position: "relative", marginLeft: "10%" }}
        >
          <br></br>
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              right: "215px",
              top: "10px",
              border: "none",
              backgroundColor: "transparent",
              color: "red",
            }}
          >
            <FontAwesomeIcon
              style={{
                width: "30px",
                height: "30px",
              }}
              icon={faXmark}
            />
          </button>
          <form
            onSubmit={sendData}
            style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}
          >
            {/* <h3 style={{fontFamily: "cursive"}}>Update Place</h3> */}
            <table>
              <tbody>
                <tr>
                  <td>
                    <div className="mb-3">
                      <h3 style={{ color: "green" }}>{placeName}</h3>
                      <p style={{ textAlign: "left" }}>{placeDescription}</p>
                    </div>
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
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}
