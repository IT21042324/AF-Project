import React, { useState, useRef } from "react";
import axios from "axios";

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
    <div className="container">
      <div class="form-style">
        <h2>Add new Event Information</h2>
        <br></br>
        <form onSubmit={sendData}>
          <div class="form-group">
            <label for="title">Title:</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Enter event title"
              onChange={(e) => {
                setname(e.target.value);
              }}
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <input
              type="text"
              class="form-control"
              id="description"
              placeholder="colombo 03 "
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              required
            />
          </div>
          <div class="form-group">
            <label for="province">Location:</label>
            <input
              type="text"
              class="form-control"
              id="province"
              placeholder="Ex:Central"
              onChange={(e) => {
                setlocation(e.target.value);
              }}
              required
            />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input
              type="text"
              class="form-control"
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
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>
          <div class="form-group">
            <label for="date">Date:</label>
            <input
              type="date"
              class="form-control"
              id="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
            />
          </div>
          <div class="form-group">
            <label for="category">category:</label>
            <select
              class="form-control"
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
          <div class="form-group">
            <label for="organizerName">organizer Name:</label>
            <input
              type="text"
              class="form-control"
              id="organizerName"
              placeholder="Ex:20000"
              onChange={(e) => {
                setOrganizerName(e.target.value);
              }}
              required
            />
          </div>
          <div class="form-group">
            <label for="organizerContact">organizer Contact:</label>
            <input
              type="text"
              class="form-control"
              id="organizerContact"
              placeholder="Ex:20000"
              onChange={(e) => {
                setOrganizerContact(e.target.value);
              }}
              required
            />
          </div>
          <div class="form-group">
            <label for="ticketAvailability">Ticket Availability:</label>
            <select
              class="form-control"
              id="ticketAvailability"
              onChange={(e) => setTicketAvailability(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
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
              required
            />
          </div>
          <br></br>
          <input type="checkbox" name="terms" required /> <br></br>
          <br></br>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}
