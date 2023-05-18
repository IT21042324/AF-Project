import React, { useState, useRef } from "react";
import axios from "axios";
import "../../styles/newHotel.css";
import { useNavigate } from "react-router-dom";

export function AddHotelForm() {
  const [hotel, setHotel] = useState([]);
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [distance, setdistance] = useState("");
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [cheapestPrice, setcheapestprice] = useState("");

  //image

  const [photos, setProductPicture] = useState([]);

  function sendData(e) {
    e.preventDefault();

    const NewHotel = {
      name,
      type,
      city,
      address,
      distance,
      title,
      description,
      cheapestPrice,
    };

    axios
      .post("http://localhost:8070/api/hotels/add", NewHotel)
      .then(() => {
        alert("Hotel Successfully added");
        setname("");
        settype("");
        setcity("");
        setaddress("");
        setdistance("");
        setTitle("");
        setdescription("");
        setcheapestprice("");
      })

      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>

        <div className="bottom">
          <div className="right">
            <form onSubmit={sendData}>
              <div className="formInput">
                <label htmlFor="name">Hotel Name</label>

                <input
                  type="text"
                  id="name"
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Accommodation Type</label>
                <select
                  id="type"
                  onChange={(e) => {
                    settype(e.target.value);
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartments</option>
                  <option value="Resort">Resort</option>
                  <option value="Cabin">Cabin</option>
                </select>
              </div>
              <div className="formInput">
                <label htmlFor="city">City</label>

                <input
                  type="text"
                  id="city"
                  placeholder="Colombo, Kandy..."
                  onChange={(e) => setcity(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="address">Address</label>

                <input
                  type="text"
                  id="address"
                  onChange={(e) => setaddress(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label htmlFor="distance">Distance</label>
                <input
                  type="text"
                  id="distance"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                      setdistance(value);
                    }
                  }}
                  onInvalid={(e) => {
                    e.target.setCustomValidity(
                      "Please enter a valid Distance."
                    );
                    alert("Please enter a valid Distance.");
                  }}
                />
              </div>

              <div className="formInput">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label htmlFor="cheapestPrice">
                  Cheapest Price $ per night
                </label>
                <input
                  type="number"
                  id="cheapestPrice"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                      setcheapestprice(value);
                    }
                  }}
                  onInvalid={(e) => {
                    e.target.setCustomValidity("Please enter a valid Price.");
                    alert("Please enter a valid Price.");
                  }}
                  required
                />
              </div>

              <div className="formInput">
                <br></br>
                <button type="submit" className="btn btn-primary">
                  Insert Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
