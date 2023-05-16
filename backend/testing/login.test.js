const login = require("../model_assets/login");
const mongoose = require("mongoose");
require("dotenv").config();

beforeAll(async () => {
  const URI = process.env.URI;
  mongoose.connect(URI);
});

test("login with valid email and valid password should return user object", async () => {
  const user = await login("test@gmail.com", "password123");
  expect(user).toBeDefined(); //to make sure the returned value is not an undefined value
}, 20000);

test("login with valid email and invalid password should throw error", async () => {
  await expect(login("test@gmail.com", "invalidpassword123")).rejects.toThrow(
    "Incorrect Password"
  );
}, 20000);

test("login with invalid email and valid password should throw error", async () => {
  await expect(login("invalidtest@gmail.com", "password123")).rejects.toThrow(
    "User Name doesn't exist"
  );
}, 20000);

afterAll(async () => {
  await mongoose.disconnect();
});
