const express = require("express");
const { User } = require("../models/user");
const { userAuth } = require("../middleware/auth");

const requestsRouter = express.Router();

requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  res.send("This is the send connection request route");
});

module.exports = requestsRouter;
