import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./BookTicket.css";
import { Link } from "react-router-dom";

function EditInfo() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageInputRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function getEventInfo() {
      try {
        const response = await axios.get(`${backendUrl}/api/events/`);
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
      <h1
        className="text-center mb-5"
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
          color: "#333",
          textShadow: "1px 1px #fff",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Discover the Best Cultural Experiences in Our country...
      </h1>

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
                  style={{ height: "300px" }}
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
                <p
                  className="card
                -text"
                >
                  <strong>Date:</strong> {event.Date}
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

                <br />
                <br />

                <Link
                  to={{
                    pathname: `/cultural/BookEvent/${event._id}`,
                    search: `?price=${event.price}&eventId=${event._id}&title=${event.name}`,
                  }}
                  disabled={event.ticketAvailability !== "available"}
                >
                  <button
                    className="btn btn-primary"
                    disabled={event.ticketAvailability !== "available"}
                    onClick={() => {
                      if (event.ticketAvailability !== "available") {
                        alert("Tickets are unavailable for this event.");
                      } else {
                        setSelectedEvent(event);
                      }
                    }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      marginBottom: "30px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    Book Now
                  </button>
                </Link>
                {selectedEvent && (
                  <img
                    src={selectedEvent.url}
                    alt={selectedEvent.name}
                    className="selected-event-image"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditInfo;
