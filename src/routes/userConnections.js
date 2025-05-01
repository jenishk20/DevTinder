const express = require("express");
const { User } = require("../models/user");
const userConnectionsRouter = express.Router();

userConnectionsRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send("Error in fetching users");
  }
});

module.exports = userConnectionsRouter;
