const router = require("express").Router();
const {
  postProduct,
  addReview,
  getAllProducts,
  modifyReview,
  deleteReview,
  updateProduct,
  getOneProduct,
  deleteProduct,
  deleteAllUserProducts,
  addOrUpdateDiscussionThread,
  deleteDiscussionThread,
  incrementLikeCounter,
  decrementLikeCounter,
} = require("../controller/product");

// Route for adding a new item
router.post("/addProduct", postProduct);

// Route for adding a new review to an item
router.patch("/addReview", addReview);

// Route for modifying an existing review for an item
router.patch("/modifyReview", modifyReview);

// Route for deleting a review for an item
router.patch("/deleteReview", deleteReview);

// Route for deleting an item
router.delete("/deleteProduct/:id", deleteProduct);

// Route for getting all items
router.get("/", getAllProducts);

// Route for getting a specific item by ID
router.get("/:id", getOneProduct);

// Route for updating an item
router.patch("/updateProduct", updateProduct);

// Route for deleting all items for a specific store by store ID
router.delete("/deleteStoreProducts/:id", deleteAllUserProducts);

//Route for starting a new discussion for a specific product
router.patch("/discussion/addOrUpdateDiscussion", addOrUpdateDiscussionThread);

//Route to delete the discussion thread
router.patch("/discussion/deleteDiscussion", deleteDiscussionThread);

//Route to increse the like counter
router.patch("/incrementLikeCounter", incrementLikeCounter);

//Route to decrese the like counter
router.patch("/decrementLikeCounter", decrementLikeCounter);

//export all routes
module.exports = router;
