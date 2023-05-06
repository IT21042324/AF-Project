const eventModel = require("../model/events");

const addEvent = async (req, res) => {
  const {
    name,
    description,
    location,
    price,
    Date,
    category,
    organizerName,
    organizerContact,
    ticketAvailability,
    url,
  } = req.body;

  const newEvent = new eventModel({
    name,
    description,
    location,
    price,
    Date,
    category,
    organizerName,
    organizerContact,
    ticketAvailability,
    url,
  });

  await newEvent
    .save()
    .then(() => {
      //body
      res.json("New Event added");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllEvents = (req, res) => {
  eventModel
    .find()
    .then((event_s) => {
      res.json(event_s);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateEvent = async (req, res) => {
  let eventID = req.params.id;
  const {
    name,
    description,
    location,
    price,
    Date,
    category,
    organizerName,
    organizerContact,
    ticketAvailability,
  } = req.body;

  const updateEvents = {
    name,
    description,
    location,
    price,
    Date,
    category,
    organizerName,
    organizerContact,
    ticketAvailability,
  };

  const update = await eventModel
    .findByIdAndUpdate(eventID, updateEvents)
    .then(() => {
      res.status(200).send({ status: "Event information updated" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
};

const deleteEvent = async (req, res) => {
  let eventID = req.params.id;

  await eventModel
    .findByIdAndDelete(eventID)
    .then(() => {
      res.status(200).send({ status: "Event deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
};

const getOneEvent = async (req, res) => {
  let eventID = req.params.id;
  const event_s = await eventModel
    .findById(eventID)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err.messsage);
      res.status(500).send({ status: "Error", error: err.message });
    });
};

module.exports = {
  addEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getOneEvent,
};
