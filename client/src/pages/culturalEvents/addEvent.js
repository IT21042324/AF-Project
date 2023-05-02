import React, { useState } from "react";
import axios from "axios";

export function AddEvent() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerContact, setOrganizerContact] = useState("");
  const [ticketAvailability, setTicketAvailability] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newEvent = {
      name,
      description,
      location,
      price,
      time,
      category,
      organizerName,
      organizerContact,
      ticketAvailability,
    };

    axios
      .post("http://localhost:8070/events/add", newEvent)
      .then(() => {
        alert("event infromation added");
        setname("");
        setdescription("");
        setlocation("");
        setPrice("");
        setTime("");
        setCategory("");
        setOrganizerName("");
        setOrganizerContact("");
        setTicketAvailability("");
      })
      .catch((err) => {
        alert(err);
      });
  }
  // const sendEmail=async (e) =>  {
  //   e.preventDefault();

  //   const data={
  //     email
  //   }
  //   try {
  //   const response = await axios.post("http://localhost:4002/api/sendEmail",data)
  //   console.log(response.data)
  //   alert("Confirmation email sent successfully!!!.Please check your email");
  // } catch (error) {
  //   alert("Error occurred while sending confirmation email.");
  //   console.error(error);
  // }
  // };
  return (
    <div className="container">
      <div class="form-style">
        <h1>Add new Event Information</h1>
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
            />
          </div>
          <div class="form-group">
            <label for="description">description:</label>
            <input
              type="text"
              class="form-control"
              id="description"
              placeholder="colombo 03 "
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label for="province">Province:</label>
            <input
              type="text"
              class="form-control"
              id="province"
              placeholder="Ex:Central"
              onChange={(e) => {
                setlocation(e.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input
              type="text"
              class="form-control"
              id="price"
              placeholder="Rs:2000 /-"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label for="time">Start time:</label>
            <input
              type="text"
              class="form-control"
              id="time"
              placeholder="Ex:20000"
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label for="category">category:</label>
            <input
              type="text"
              class="form-control"
              id="category"
              placeholder="Ex:20000"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
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
            />
          </div>
          <div class="form-group">
            <label for="ticketAvailability">ticket tAvailability:</label>
            <input
              type="text"
              class="form-control"
              id="ticketAvailability"
              placeholder="Ex:20000"
              onChange={(e) => {
                setTicketAvailability(e.target.value);
              }}
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
