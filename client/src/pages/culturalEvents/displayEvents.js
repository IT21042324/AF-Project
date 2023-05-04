import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../index.css";

function EditInfo() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageInputRef = useRef(null);

  useEffect(() => {
    async function getEventInfo() {
      try {
        const response = await axios.get("http://localhost:8070/api/events/");
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getEventInfo();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mb-5">Events</h1>
      {loading && <div className="text-center">Loading...</div>}
      {!loading && events.length === 0 && (
        <div className="text-center">No events found.</div>
      )}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {events.map((event) => (
          <div key={event._id} className="col">
            <div className="card h-100">
              {event.url && (
                <img
                  src={event.url}
                  className="card-img-top"
                  alt={event.name}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> {event.price}
                </p>
                <p className="card-text">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="card-text">
                  <strong>Category:</strong> {event.category}
                </p>
                <p className="card-text">
                  <strong>Organizer Name:</strong> {event.organizerName}
                </p>
                <p className="card-text">
                  <strong>Organizer Contact:</strong> {event.organizerContact}
                </p>
                <p className="card-text">
                  <strong>Ticket Availability:</strong>{" "}
                  {event.ticketAvailability}
                </p>
                <button
                  className="btn btn-primary"
                  disabled={event.ticketAvailability !== "available"}
                  onClick={() => {
                    if (event.ticketAvailability !== "available") {
                      alert("Tickets are unavailable for this event.");
                    } else {
                      //window.location.href = `/book/${event._id}`;
                    }
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditInfo;
