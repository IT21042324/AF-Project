import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { UseUserContext } from "../../hooks/useUserContext";
import axios from "axios";
import "./BookTicket.css";

function BookTicket() {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const { getUser } = UseUserContext();

  const user = getUser();

  console.log(user);

  //titlle
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get("title");
    setTitle(title);
  }, [location]);

  //price
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get("price");
    setPrice(price);
  }, [location]);

  //add a ticket
  const handleSubmit = async (event) => {
    console.log(event);

    event.preventDefault();
    let valid = true;
    if (validateInputs()) {
      const totalAmount = calculateTotalAmount(price, numberOfTickets);
      console.log("Total Amount:", totalAmount);
      const data = {
        name,
        email,
        phone,
        numberOfTickets,
        price,
        totalAmount,
        userId: user._id,
        eventId: location.pathname.split("/")[2],
      };
      data.total = totalAmount;

      console.log("Data:", data);
      try {
        const response = await axios.post(
          "http://localhost:8070/api/ticket/add",
          data
        );
        console.log("Response:", response.data);
        if (response.status === 200) {
          alert("Ticket booked successfully!");
        } else {
          alert("Error booking ticket. Please try again later.");
        }
      } catch (error) {
        console.error(error);
        alert("Error booking ticket. Please try again later.");
      }
    }
  };

  const handleNumberOfTicketsChange = (event) => {
    setNumberOfTickets(event.target.value);
    const totalAmount = calculateTotalAmount(price, event.target.value);
    setTotalAmount(totalAmount);
  };
  const formData = {
    name,
    email,
    phone,
    numberOfTickets,
    price,
  };

  //calculate amount

  function calculateTotalAmount(price, numberOfTickets) {
    return price * numberOfTickets;
  }

  const validateInputs = () => {
    let valid = true;
    // validate name
    if (name.trim() === "") {
      valid = false;
      alert("Please enter your name.");
    }
    // validate email
    if (email.trim() === "") {
      valid = false;
      alert("Please enter your email address.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      alert("Please enter a valid email address.");
    }
    // validate phone
    if (phone.trim() === "") {
      valid = false;
      alert("Please enter your phone number.");
    } else if (!/^\d{10}$/.test(phone)) {
      valid = false;
      alert("Please enter a valid phone number.");
    }
    // validate number of tickets
    if (numberOfTickets.trim() === "") {
      valid = false;
      alert("Please enter the number of tickets.");
    } else if (numberOfTickets < 1 || numberOfTickets > 10) {
      valid = false;
      alert("Please enter a number between 1 and 10.");
    }
    // validate price
    if (price.trim() === "") {
      valid = false;
      alert("Please enter the price.");
    } else if (isNaN(price)) {
      valid = false;
      alert("Please enter a valid price.");
    }

    return valid;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center mb-5">Book a Ticket for the {title} </h1>
        <br></br>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numberOfTickets" className="form-label">
            Number of Tickets
          </label>
          <input
            type="number"
            className="form-control"
            id="numberOfTickets"
            min="1"
            max="10"
            value={numberOfTickets}
            onChange={handleNumberOfTicketsChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">
            Total Amount
          </label>
          <input
            type="text"
            className="form-control"
            id="totalAmount"
            value={totalAmount}
            readOnly
          />
        </div>
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="termsAndConditions">
            I agree to the terms and conditions
          </label>
          <input type="checkbox" name="terms" required /> <br></br>
        </div>
        <button type="submit" className="btn btn-primary">
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookTicket;
