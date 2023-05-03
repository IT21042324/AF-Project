const express = require("express");
const router = express.Router();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const protectedProuductRouter = require("./routes/protectedProduct");
const eventRouter = require("./routes/events");
const hotelsRouter = require("./routes/hotels");
const roomsRouter = require("./routes/rooms");
const placeRouter = require("./routes/place.route");

// Set up route for handling requests to /api/user endpoint
router.use("/api/users", userRouter);
router.use("/api/normal/products", productRouter);
router.use("/api/protected/products", protectedProuductRouter);
router.use("/api/events", eventRouter);
router.use("/api/hotels", hotelsRouter);
router.use("/api/rooms", roomsRouter);
router.use("/api/place", placeRouter);

module.exports = router;
