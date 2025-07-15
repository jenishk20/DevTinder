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

      const request = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await request.save();
      res.json({
        message:
          req.user.firstName +
          " is interested in connecting with " +
          toUser.firstName,
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  }
);

requestsRouter.post(
  "/requests/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;

      // Akshay sending to Elon
      // Logged in user is Elon Elon == toUserId
      // Status should be interested then only I can accept or reject
      // Validation on Status
      // RequestID should be valid
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

      const checkRequestId = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!checkRequestId) {
        throw new Error("Request ID is not found");
      }

      checkRequestId.status = status;
      const data = await checkRequestId.save();
      res.status(200).json({
        message: "Request status updated successfully",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
);

module.exports = requestsRouter;
