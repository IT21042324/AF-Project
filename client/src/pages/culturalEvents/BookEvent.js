import React from "react";
function BookTicket() {
  return (
    <div className="container">
      <h1 className="text-center mb-5">Book Ticket</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input type="tel" className="form-control" id="phone" />
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
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="termsAndConditions"
          />
          <label className="form-check-label" htmlFor="termsAndConditions">
            I agree to the terms and conditions
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookTicket;
