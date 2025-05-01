const express = require("express");
const { User } = require("../models/user");
const { userAuth } = require("../middleware/auth");
const { validateProfileEditData } = require("../utils/validation");
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

module.exports = profileRouter;
