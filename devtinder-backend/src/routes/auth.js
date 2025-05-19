const express = require("express");
const { User } = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validating Data
    validateSignupData(req);
    // Encrypt Data
    const { firstName, lastName, emailId, password, gender, photoURL } =
      req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const userObj = req.body;

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
      photoURL,
    });

    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      throw new Error("Email and password are required");
    }

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email format");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = await user.getJWT();
    // Cookie logic
    res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = authRouter;
