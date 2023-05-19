const express = require("express");
const router = express.Router();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const protectedProuductRouter = require("./routes/protectedProduct");
const eventRouter = require("./routes/events");
const ticketRouter = require("./routes/ticket");
const hotelsRouter = require("./routes/hotels");
const roomsRouter = require("./routes/rooms");
const placeRouter = require("./routes/place.route");
const protectedPlaceRouter = require("./routes/protectedPlace");
const uploadImage = require("./routes/uploadImage");

// Set up route for handling requests to /api/user endpoint
router.use("/api/users", userRouter);
router.use("/api/normal/products", productRouter);
router.use("/api/protected/products", protectedProuductRouter);
router.use("/api/events", eventRouter);
router.use("/api/ticket", ticketRouter);
router.use("/api/hotels", hotelsRouter);
router.use("/api/rooms", roomsRouter);
router.use("/api/place", placeRouter);
router.use("/api/Protectedplace", protectedPlaceRouter);

router.post("/uploadEventimage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => {
      res.send(url);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//image uploading for places
router.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((imageUrl) => {
      res.send(imageUrl);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
