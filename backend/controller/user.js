const userModel = require("../model/user");
const jwt = require("jsonwebtoken");

//To generate a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
  //1st argument->object for payload
  //2nd argument-> secret string only know for our server (.env file)
  //3rd argument-> optional. just to say it expires in 3 days
};

const userLogin = async (req, res) => {
  try {
    // Get userName, password, and role from request body
    const { userName, password } = req.body;

    // Authenticate user using userModel's login method
    const user = await userModel.login(userName, password);

    // Create JWT for authenticated user
    const token = createToken(user._id);

    // Send JWT and user data in response

    console.log({ ...user.toObject(), token });
    res.status(200).json({ ...user.toObject(), token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
};

const userSignUp = async function (req, res) {
  // Get user details from request body
  const { userName, password, contact, role, image, bio } = req.body;

  try {
    // Create new user using userModel's signup method
    const user = await userModel.signup(
      userName,
      password,
      contact,
      image,
      role,
      bio
    );

    // Create JWT for new user
    const token = createToken(user._id);

    // Send JWT and user data in response
    res.status(200).json({ ...user.toObject(), token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
};

const getAllUsers = async function (req, res) {
  try {
    // Get all users from MongoDB database using Mongoose, excluding the image field
    const users = await userModel.find().select("-image");

    // Send users and user count in response
    res.json(users);
  } catch (err) {
    res.send(err.message);
  }
};

const updateUserProfile = async function (req, res) {
  // Get userId, userName, and image from request body
  const { userId, contact, image, bio } = req.body;

  try {
    // Update user in MongoDB database using Mongoose
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { contact, image, bio },
      { new: true }
    );

    console.log(user);

    // Send updated user data in response
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    // Delete user from MongoDB database using Mongoose
    const data = await userModel.findByIdAndDelete(req.params.id);

    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const getOneUser = async function (req, res) {
  // Get id and role from request params
  const { id } = req.params;

  try {
    // Get user from MongoDB database using Mongoose
    const user = await userModel.find({ _id: id });

    // Send user data in response
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
  }
};

const getOneUserWithoutDP = async function (req, res) {
  // Get id and role from request params
  const { id } = req.params;

  try {
    // Get user from MongoDB database using Mongoose
    const user = await userModel.find({ _id: id }, "-image");

    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
  }
};

const approveUser = async (req, res) => {
  try {
    const data = await userModel.findByIdAndUpdate(
      req.params.id,
      { userIsApprovedByAdmin: true, userIsRejectedByAdmin: false },
      { new: true }
    );

    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
};

const rejectUser = async (req, res) => {
  try {
    const { userID, rejectionReason } = req.body;

    const data = await userModel.findByIdAndUpdate(
      userID,
      {
        userIsRejectedByAdmin: true,
        rejectionReason,
        userIsApprovedByAdmin: false,
      },
      { new: true }
    );

    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
};

const getUserCount = async (req, res) => {
  try {
    // Get all users from MongoDB database using Mongoose
    const data = await userModel.find();

    // Send user count in response
    res.json({ userCount: data.length });
  } catch (err) {
    res.send(err.message);
  }
};

// Export functions for use in other files
module.exports = {
  userSignUp,
  userLogin,
  getAllUsers,
  updateUserProfile,
  deleteUser,
  getOneUser,
  getOneUserWithoutDP,
  getUserCount,
  approveUser,
  rejectUser,
};
