const express = require("express");
const router = express.Router();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const eventRouter = require("./routes/events");

// Set up route for handling requests to /api/user endpoint
router.use("/api/users", userRouter);
router.use("/api/products", productRouter);
router.use("/api/events", eventRouter);
module.exports = router;
