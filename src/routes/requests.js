const express = require("express");
const { User } = require("../models/user");
const { userAuth } = require("../middleware/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");

const requestsRouter = express.Router();

requestsRouter.post(
  "/requests/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user?._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found");
      }

      const existingRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId: toUserId, toUserId: fromUserId },
          { fromUserId: fromUserId, toUserId: toUserId },
        ],
      });

      if (existingRequest) {
        throw new Error("Connection request already exists");
      }

      console.log("Coming here");

      const request = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      console.log("going to save data");
      const data = await request.save();
      res.json({
        message:
          req.user.firstName +
          " is interested in connecting with " +
          toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
);

module.exports = requestsRouter;
