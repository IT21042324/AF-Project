const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Array,
    default: [],
  },
  discussion: {
    type: [
      {
        chatWith: String,
        chatWithName: String,
        sender: String,
        message: String,
        time: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
