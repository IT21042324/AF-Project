const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const requireAuth = async (req, res, next) => {
  const { authorization, role } = req.headers;

  // Check if authorization token is provided in the request header
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  // Extract the token from the authorization header
  const token = authorization.split(" ")[1];

  try {
    // Verify the token using the secret key
    const { id } = jwt.verify(token, process.env.SECRET);

    // Retrieve user data from API using the id and role from the token
    const { data } = await axios.get(`http://localhost:8070/api/users/${id}`);

    // Attach user data to the request object
    req.user = data;

    // Call next middleware function
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized Request" });
  }
};

module.exports = requireAuth;
