const signup = require("../model_assets/signup");
const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.URI;

beforeAll(async () => {
  await mongoose.connect(URI);
});

test("signup with exisiting email should throw error", async () => {
  await expect(
    signup("test@gmail.com", "password123", "1234567890", "image.jpg", "User")
  ).rejects.toThrow("Email is already in use");
}, 20000);

test("signup with invalid email should throw error", async () => {
  await expect(
    signup("invalidemail", "password123", "1234567890", "image.jpg", "User")
  ).rejects.toThrow("Email is invalid");
}, 20000);

test("signup with missing data should throw error", async () => {
  await expect(signup("User")).rejects.toThrow("Please fill all fields");
}, 20000);

afterAll(async () => {
  await mongoose.disconnect();
});
