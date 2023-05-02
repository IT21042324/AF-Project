const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const allRoutes = require("./allRoutes")

//Creating an express app
const app = express();

// Configure middleware function
app.use(cors());

// Get port number and database URI from environment variables
const PORT = process.env.PORT;
const URI = process.env.URI;

// Connect to MongoDB database and start server
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connection to MongoDB successful");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

  // routes
  app.use(express.json({ limit: "20mb" }));
  app.use(allRoutes);