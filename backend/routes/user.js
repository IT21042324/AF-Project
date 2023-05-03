const router = require("express").Router();

// Import controller functions
const {
  userLogin,
  userSignUp,
  getOneUser,
  updateUserProfile,
  getUserCount,
  getAllUsers,
  deleteUser,
  approveUser,
} = require("../controller/user");

// User login route
router.post("/login", userLogin);

// User sign up route
router.post("/signup", userSignUp);

// Get all users route
router.get("/", getAllUsers);

// Update user route
router.patch("/update", updateUserProfile);

// Get one user by ID route
router.get("/:id/", getOneUser);

//call this route when admin accept the entrepreneur
router.patch("/approveUser/:id", approveUser);

// Get user count for admin route
router.get("/getUserCountForAdmin", getUserCount);

// Delete user by ID route
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
