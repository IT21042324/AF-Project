import React, { useState, useEffect } from "react";

import axios from "axios";

import "../../index.css";

function EditInfo() {
  const [event, setEvent] = useState([]);
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerContact, setOrganizerContact] = useState("");
  const [ticketAvailability, setTicketAvailability] = useState("");

  useEffect(() => {
    function getEventinfo() {
      axios
        .get("http://localhost:8070/api/events/")
        .then((res) => {
          //console.log(res.data); // debug

          setEvent(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getEventinfo();
  }, []);

  //function to get one item

  function getOneItem(did) {
    axios
      .get("http://localhost:8070/api/events/get/" + did)
      .then((res) => {
        // console.log(res.data);
        setid(res.data._id);
        setname(res.data.name);
        setdescription(res.data.description);
        setlocation(res.data.location);
        setPrice(res.data.price);
        setTime(res.data.time);
        setCategory(res.data.category);
        setOrganizerName(res.data.organizerName);
        setOrganizerContact(res.data.organizerContact);
        setTicketAvailability(res.data.ticketAvailability);
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
      .put("http://localhost:8070/api/events/update/" + id, newEvent)
      .then(() => {
        alert("Event information Updated");

        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  //delete function

  function deleteItem(ID) {
    axios
      .delete("http://localhost:8070/api/events/delete/" + ID)
      .then((res) => {
        alert("Event Information Deleted");

        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <>
      <div className="container shadow rounded">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>

              <th scope="col">Title</th>

              <th scope="col">Description</th>

              <th scope="col">Location</th>

              <th scope="col">Price</th>

              <th scope="col">Time</th>

              <th scope="col">Category</th>

              <th scope="col">Organizer name</th>

              <th scope="col">Organizer Contact</th>

              <th scope="col">ticketAvailability</th>
            </tr>
          </thead>

          <tbody>
            {event.map((event) => (
              <tr key={event._id}>
                <td>{event._id}</td>

                <td>{event.name}</td>

                <td>{event.description}</td>

                <td>{event.location}</td>

                <td>{event.price}</td>

                <td>{event.time}</td>

                <td>{event.category}</td>

                <td>{event.organizerName}</td>

                <td>{event.organizerContact}</td>

                <td>{event.ticketAvailability}</td>

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      getOneItem(event._id);
                      showUpdateBox();
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(event._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="backdrop" className="backdrop-black">
        <div id="update-box" className="container form-style3 ">
          <button
            onClick={handleClose}
            className="btn btn-outline-danger"
            style={{ width: "40px", height: "40px", float: "right" }}
          >
            X
          </button>

          <br></br>

          <br></br>

          <form onSubmit={sendData}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Title
              </label>

              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Title here"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>

              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location:
              </label>

              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price:
              </label>

              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Enter price:"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time
              </label>

              <input
                type="number"
                className="form-control"
                id="time"
                placeholder="Enter time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            a
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category:
              </label>

              <input
                type="text"
                className="form-control"
                id="category"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="organizerName" className="form-label">
                Organizer Name:
              </label>

              <input
                type="text"
                className="form-control"
                id="organizerName"
                placeholder="Enter organizer Name"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="organizerContact" className="form-label">
                organizer Contact
              </label>

              <input
                type="text"
                className="form-control"
                id="organizerContact"
                placeholder="Enter Contact Name"
                value={organizerContact}
                onChange={(e) => setOrganizerContact(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ticketAvailability" className="form-label">
                ticket Availability:
              </label>

              <input
                type="text"
                className="form-control"
                id="ticketAvailability"
                placeholder="Availlable/Not availlable"
                value={ticketAvailability}
                onChange={(e) => setOrganizerContact(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input type="checkbox" name="terms" required /> <br></br>
              <br></br>
              <button type="submit" className="btn btn-primary">
                Update Delivery Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditInfo;
