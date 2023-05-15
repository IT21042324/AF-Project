const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../model/user");

async function signup(userName, password, contact, image, role, bio) {
  if (!userName || !password || !contact) throw Error("Please fill all fields");
  if (!validator.isEmail(userName)) throw Error("Email is invalid");

  //Check if the user exists and throw an error if he does.
  const exist = await User.findOne({ userName });

  if (exist) throw Error("Email is already in use");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const signedUser = await User.create({
    userName,
    password: hash,
    contact,
    image,
    role,
    bio,
  });

  return signedUser; //To return a signedup new user object
}

module.exports = signup;
