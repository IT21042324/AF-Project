const router = require("express").Router();
const { getAllProducts, getOneProduct } = require("../controller/product");

// Route for getting all items
router.get("/", getAllProducts);

// Route for getting a specific item by ID
router.get("/:id", getOneProduct);

//export all routes
module.exports = router;
