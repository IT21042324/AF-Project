const bcrypt = require("bcryptjs");
const User = require("../model/user");

const login = async (userName, password) => {
  if (!userName || !password) throw Error("Please fill all fields");

  const user = await User.findOne({ userName });

  if (!user) {
    console.log("User Name doesn't exist");
    throw Error("User Name doesn't exist");
  } else console.log("user found:", user);

  const match = await bcrypt.compare(password, user.password); //returns true or false

  if (!match) {
    console.log("Incorrect Password");
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = login;
