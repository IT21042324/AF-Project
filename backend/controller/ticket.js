const Ticket = require("../model/ticket");

const addTicket = async (req, res) => {
  const { name, email, phone, price, numberOfTickets, total, userId, eventId } =
    req.body;

  const newTicket = new Ticket({
    name,
    email,
    phone,
    price,
    numberOfTickets,
    total,
    userId,
    eventId,
  });

  await newTicket
    .save()
    .then(() => {
      res.json("New ticket added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error adding ticket" });
    });
};

const getAllTickets = (req, res) => {
  Ticket.find()
    .then((tickets) => {
      res.json(tickets);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error getting tickets" });
    });
};

const updateTicket = async (req, res) => {
  let ticketId = req.params.id;
  const { name, email, phone, price, numberOfTickets, total, userId, eventId } =
    req.body;

  const updatedTicket = {
    name,
    email,
    phone,
    price,
    numberOfTickets,
    total,
    userId,
    eventId,
  };

  await Ticket.findByIdAndUpdate(ticketId, updatedTicket)
    .then(() => {
      res.status(200).send({ status: "Ticket information updated" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
};

const deleteTicket = async (req, res) => {
  let ticketId = req.params.id;

  await Ticket.findByIdAndDelete(ticketId)
    .then(() => {
      res.status(200).send({ status: "Ticket deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
};

module.exports = {
  addTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
};
