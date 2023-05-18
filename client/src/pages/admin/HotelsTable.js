import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import "../../styles/hotelList.css";

import { Navigate, useNavigate } from "react-router-dom";
import { AdminDashBoardDetails } from "../../components/AdminDashBoardDetails";

export function EditHotel() {
  const [hotel, setHotel] = useState([]);
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [distance, setdistance] = useState("");
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState("");
  const [rooms, setrooms] = useState([]);
  const [cheapestPrice, setcheapestprice] = useState("");
  const [featured, setfeatured] = useState("");
  const imageInputRef = useRef(null);

  //image

  const [photos, setProductPicture] = useState([]);

  //

  function convertToBase64(e) {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please upload only image files.");
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      const newPhotos = [...photos, reader.result];
      setProductPicture(newPhotos);
    };

    reader.onerror = (error) => console.log("error: ", error);
  }

  useEffect(() => {
    function getHotelinfo() {
      axios
        .get("http://localhost:8070/api/hotels/")
        .then((res) => {
          //console.log(res.data); // debug

          setHotel(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getHotelinfo();
  }, []);

  //function to get one item

  function getOneHotel(did) {
    axios
      .get("http://localhost:8070/api/hotels/get/" + did)
      .then((res) => {
        // console.log(res.data);
        setid(res.data._id);
        setname(res.data.name);
        settype(res.data.type);
        setcity(res.data.city);
        setaddress(res.data.address);
        setdistance(res.data.distance);
        setTitle(res.data.title);
        setdescription(res.data.description);
        setrating(res.data.rating);
        setrooms(res.data.rooms);
        setcheapestprice(res.data.cheapestPrice);
        setfeatured(res.data.featured);
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
  };

  //Update function

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
      rating,
      rooms,
      cheapestPrice,
      featured,
    };

    axios
      .put("http://localhost:8070/api/hotels/update/" + id, NewHotel)
      .then(() => {
        alert("Hotel information Updated");

        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  //delete function

  function deleteHotel(ID) {
    axios
      .delete("http://localhost:8070/api/hotels/delete/" + ID)
      .then((res) => {
        alert("Hotel Information Deleted");

        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  const navigate = useNavigate();

  function handlenew() {
    navigate("/admin/addHotel");
  }

  return (
    <>
      <section className="main-dashboard">
        <AdminDashBoardDetails
          title={"Manage Accomodations"}
          subTitle={"Manage All Accomodations From Here.."}
        />

        <div className="card mb-4">
          <header className="card-header">
            <h2>Hotels</h2>
            <button className="btn btn-primary" onClick={handlenew}>
              Add New Hotel
            </button>
          </header>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Hotel ID</th>

                    <th scope="col">Hotel</th>

                    <th scope="col">Type</th>

                    <th scope="col">City</th>

                    <th scope="col">Title</th>

                    <th scope="col">Cheapest Price</th>

                    <th scope="col">Photos</th>
                  </tr>
                </thead>

                <tbody>
                  {hotel.map((hotel) => (
                    <tr key={hotel._id}>
                      <td>{hotel._id}</td>

                      <td>{hotel.name}</td>

                      <td>{hotel.type}</td>

                      <td>{hotel.city}</td>

                      <td>{hotel.title}</td>

                      <td>{hotel.cheapestPrice}</td>

                      <td>
                        <img
                          src={hotel.photos[0]}
                          alt="hotel image"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>

                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            getOneHotel(hotel._id);
                            showUpdateBox();
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => deleteHotel(hotel._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div id="backdrop" className="backdrop-black1">
          <div id="update-box" className="hotelContainer form-styles scrollable">
            <button
              onClick={handleClose}
              className="btn11 btn-outline-danger"
              style={{ width: "40px", height: "40px", float: "right" }}
            >
              X
            </button>

            <br></br>

            <br></br>

            <form onSubmit={sendData}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Hotel Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Accommodation Type
                </label>
                <select
                  class="form-control"
                  id="type"
                  value={type}
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
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Colombo, Kandy..."
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="distance" className="form-label">
                  Distance
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="distance"
                  value={distance}
                  onChange={(e) => {
                    setdistance(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cheapestPrice" className="form-label">
                  Cheapest Price $ per night
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="cheapestPrice"
                  value={cheapestPrice}
                  onChange={(e) => {
                    setcheapestprice(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="featured" className="form-label">
                  Featured status
                </label>

                <select
                  class="form-control"
                  id="featured"
                  value={featured}
                  onChange={(e) => {
                    setfeatured(e.target.value);
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="true">Featured</option>
                  <option value="false">Not Featured</option>
                </select>
              </div>

              <div className="mb-3">
                <label for="itemImage"> Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="itemImage"
                  onChange={(e) => convertToBase64(e)}
                  ref={imageInputRef}
                />
              </div>
              <div className="mb-3">
                <input type="checkbox" name="terms" required /> <br></br>
                <br></br>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditHotel;
