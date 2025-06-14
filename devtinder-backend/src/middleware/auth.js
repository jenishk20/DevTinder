const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const userAuth = async (req, res, next) => {
  // Read the token from the req
  // Validate Token
  // Find the user
  try {
    const { token } = req.cookies;
    if (!token) {
      
      throw new Error("No token found");
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userProfile = await User.findById(decodedObj._id);
    if (!userProfile) {
      throw new Error("User not found");
    }
    req.user = userProfile;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};
module.exports = { userAuth };
