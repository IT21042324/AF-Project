import React, { useState, useRef } from "react";
import axios from "axios";
import "./editevent.css";
import { AdminDashBoardDetails } from "../../components/AdminDashBoardDetails";

export function AddEvent() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const [price, setPrice] = useState("");
  const [Date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerContact, setOrganizerContact] = useState("");
  const [ticketAvailability, setTicketAvailability] = useState("");
  const imageInputRef = useRef(null);

  //to validate the price
  const [errorMessage, setErrorMessage] = useState("");

  const [image, setProductPicture] = useState("");

  //image

  function convertToBase64(e) {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please upload only image files.");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => setProductPicture(reader.result);

    reader.onerror = (error) => console.log("error: ", error);
  }

  //function to validate the price

  function validatePrice(price) {
    // Regex pattern for validating the price (2 decimal places only)
    const pattern = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!pattern.test(price)) {
      setErrorMessage("Please enter a valid price (e.g. 123.45)");
      return false;
    }
    setErrorMessage("");
    return true;
  }
  //function for sending data

  function sendData(e) {
    e.preventDefault();

    if (!validatePrice(price)) {
      return;
    }

    const newEvent = {
      name,
      description,
      location,
      price,
      Date,
      category,
      organizerName,
      organizerContact,
      ticketAvailability,
      url: image,
    };

    axios
      .post("http://localhost:8070/api/events/add", newEvent)
      .then(() => {
        alert("event infromation added");
        setname("");
        setdescription("");
        setlocation("");
        setPrice("");
        setDate("");
        setCategory("");
        setOrganizerName("");
        setOrganizerContact("");
        setTicketAvailability("");
        imageInputRef.current.value = "";
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    //         <label for="title">Title:</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="title"
    //           placeholder="Enter event title"
    //           onChange={(e) => {
    //             setname(e.target.value);
    //           }}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label for="description">Description:</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="description"
    //           placeholder="colombo 03 "
    //           onChange={(e) => {
    //             setdescription(e.target.value);
    //           }}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label for="province">Location:</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="province"
    //           placeholder="Ex:Central"
    //           onChange={(e) => {
    //             setlocation(e.target.value);
    //           }}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label for="price">Price:</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="price"
    //           placeholder="Rs."
    //           onChange={(e) => {
    //             setPrice(e.target.value);
    //           }}
    //           onBlur={(e) => {
    //             validatePrice(e.target.value);
    //           }}
    //           required
    //         />
    //         {errorMessage && (
    //           <div style={{ color: "red" }}>{errorMessage}</div>
    //         )}
    //       </div>
    //       <div className="form-group">
    //         <label for="date">Date:</label>
    //         <input
    //           type="date"
    //           className="form-control"
    //           id="date"
    //           onChange={(e) => {
    //             setDate(e.target.value);
    //           }}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label for="category">category:</label>
    //         <select
    //           className="form-control"
    //           id="category"
    //           onChange={(e) => {
    //             setCategory(e.target.value);
    //           }}
    //           required
    //         >
    //           <option value="">-- Select --</option>
    //           <option value="music">Music</option>
    //           <option value="dance">Dance</option>
    //           <option value="theater">Theater</option>
    //           <option value="art">Art</option>
    //           <option value="festival">Festival</option>
    //         </select>
    //       </div>
    //       <div className="form-group">
    //         <label for="organizerName">organizer Name:</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="organizerName"
    //           placeholder="Ex:20000"
    //           onChange={(e) => {
    //             setOrganizerName(e.target.value);
    //           }}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label for="organizerContact">organizer Contact:</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="organizerContact"
    //           placeholder="Ex:20000"
    //           onChange={(e) => {
    //             setOrganizerContact(e.target.value);
    //           }}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label for="ticketAvailability">Ticket Availability:</label>
    //         <select
    //           className="form-control"
    //           id="ticketAvailability"
    //           onChange={(e) => setTicketAvailability(e.target.value)}
    //           required
    //         >
    //           <option value="">-- Select --</option>
    //           <option value="available">Available</option>
    //           <option value="unavailable">Unavailable</option>
    //         </select>
    //       </div>
    //       <div className="mb-3">
    //         <label for="itemImage"> Image</label>
    //         <input
    //           type="file"
    //           className="form-control"
    //           id="itemImage"
    //           onChange={(e) => convertToBase64(e)}
    //           ref={imageInputRef}
    //           required
    //         />
    //       </div>
    //       <br></br>
    //       <input type="checkbox" name="terms" required /> <br></br>
    //       <br></br>
    //       <button type="submit" className="btn btn-primary">
    //         Submit
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <div>
      <section className="main-wrap">
        <AdminDashBoardDetails
          title={"Add New Event"}
          subTitle={"Add Your Events From Here.."}
        />

        <div className="card mb-4">
          <form onSubmit={sendData}>
            <header className="card-header">
              <h4 style={{ color: "black" }}>Add Event</h4>
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
                  <label htmlFor="eventTitle" style={{ float: "left" }}>
                    Event Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter event title"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="description" style={{ float: "left" }}>
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="colombo 03 "
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="eventTitle" style={{ float: "left" }}>
                    Province
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="province"
                    placeholder="Ex:Central"
                    onChange={(e) => {
                      setlocation(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="description" style={{ float: "left" }}>
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Rs."
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    onBlur={(e) => {
                      validatePrice(e.target.value);
                    }}
                    required
                  />
                  {errorMessage && (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="eventTitle" style={{ float: "left" }}>
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="description" style={{ float: "left" }}>
                    Category
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    required
                  >
                    <option value="">-- Select --</option>
                    <option value="music">Music</option>
                    <option value="dance">Dance</option>
                    <option value="theater">Theater</option>
                    <option value="art">Art</option>
                    <option value="festival">Festival</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="eventTitle" style={{ float: "left" }}>
                    Organizer Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="organizerName"
                    placeholder="Ex:20000"
                    onChange={(e) => {
                      setOrganizerName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="description" style={{ float: "left" }}>
                    Organizer Contact
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="organizerContact"
                    placeholder="Ex:20000"
                    onChange={(e) => {
                      setOrganizerContact(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="quantity" style={{ float: "left" }}>
                    Ticket Availability
                  </label>
                  <select
                    className="form-control"
                    id="ticketAvailability"
                    onChange={(e) => setTicketAvailability(e.target.value)}
                    required
                  >
                    <option value="">-- Select --</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="image" style={{ float: "left" }}>
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="itemImage"
                    onChange={(e) => convertToBase64(e)}
                    ref={imageInputRef}
                    required
                  />
                  <br></br>
                </div>

                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <input type="checkbox" name="terms" required />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <label>
                    I agree to add the new event to the system by checking the
                    box
                  </label>
                </div>
                <br></br>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
