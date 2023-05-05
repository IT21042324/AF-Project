const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const uploadImage = require("./routes/uploadImage");

//To import all routes from allRoutes.js
const allRoutes = require("./allRoutes");

//Creating an express app
const app = express();

// Configure middleware function
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
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

app.post("/uploadEventimage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => {
      res.send(url);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//importing all routes from allRoutes.js
app.use(express.json());
app.use(allRoutes);

//image uploading for places
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((imageUrl) => {
      res.send(imageUrl);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
