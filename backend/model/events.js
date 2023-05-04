const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Eventschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["music", "dance", "theater", "art"],
    required: true,
  },
  organizerName: {
    type: String,
    required: true,
  },
  organizerContact: {
    type: String,
    required: true,
  },
  ticketAvailability: {
    type: String,
    required: true,
  },

  url: {
    type: String,
  },
});

const events = mongoose.model("EventsInfo", Eventschema);

module.exports = events;
