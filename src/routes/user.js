const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName skills age gender about photoURL";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUserId._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    // How to get information about who has sent me requests ?
    // Building a relation between the two users

    res.status(200).json(connectionRequests);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user;
    const acceptedRequests = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUserId._id, status: "accepted" },
        { toUserId: loggedInUserId._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = acceptedRequests.map((request) =>
      request.fromUserId._id.toString() === loggedInUserId._id.toString()
        ? request.toUserId
        : request.fromUserId
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = userRouter;
