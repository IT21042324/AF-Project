const express = require("express");
const router = express.Router();
const placeRouter = require("./routes/place.route");

router.use("/api/place", placeRouter);

module.exports = router;