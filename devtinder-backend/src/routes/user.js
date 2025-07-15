const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const { User } = require("../models/user");
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

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = req.query.page || 1;
    let limit = req.query.limit || 10;

    if (limit > 100) {
      limit = 10;
    }

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId status");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId.toString());
      hideUsersFromFeed.add(request.toUserId.toString());
    });

    const allUsersInFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser?._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(allUsersInFeed);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
module.exports = userRouter;
