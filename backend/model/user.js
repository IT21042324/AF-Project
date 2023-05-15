const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    bio: String,
    userIsApprovedByAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    userIsRejectedByAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    rejectionReason: String,
  },
  { timestamps: true }
);

//Creating User schema functions
userSchema.statics.signup = async function (
  userName,
  password,
  contact,
  image,
  role,
  bio
) {
  if (!userName || !password || !contact) throw Error("Please fill all fields");
  if (!validator.isEmail(userName)) throw Error("Email is invalid");

  //Check if the user exists and throw an error if he does.
  const exist = await this.findOne({ userName });

  if (exist) throw Error("Email is already in use");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const singedUser = await this.create({
    userName,
    password: hash,
    contact,
    image,
    role,
    bio,
  });

  return singedUser; //To return a signedup new user object
};

userSchema.statics.login = async function (userName, password) {
  if (!userName || !password) throw Error("Please fill all fields");

  const user = await this.findOne({ userName });
  if (!user) throw Error("User Name doesn't exist");

  const match = await bcrypt.compare(password, user.password); //returns true or false

  if (!match) throw Error("Incorrect Password");

  return user;
};

module.exports = mongoose.model("User", userSchema);
