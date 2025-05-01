const express = require("express");
const { User } = require("../models/user");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;

  try {
    const ALLOWED_UPDATES = ["photoURL", "skills", "about", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data.skills.length > 5) {
      throw new Error("Skills length should be less than 5");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
