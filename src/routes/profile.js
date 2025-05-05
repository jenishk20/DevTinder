const express = require("express");
const { User } = require("../models/user");
const { userAuth } = require("../middleware/auth");
const { validateProfileEditData } = require("../utils/validation");
const validator = require("validator");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Update not allowed");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.send(loggedInUser.firstName + " your profile is updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/forgot-password", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Email is required");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("New Password is not strong enough");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("User not found, incorrect email address entered");
    }

    if (user.validatePassword(password)) {
      throw new Error("New password should not be same as old password");
    }

    const newPasswordHash = await bcrypt.hash(password, 10);
    user.password = newPasswordHash;
    await user.save();
    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
