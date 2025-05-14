const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "accepted", "rejected", "ignored"],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (
    connectionRequest.fromUserId.toString() ===
    connectionRequest.toUserId.toString()
  ) {
    return next(new Error("You cannot send a connection request to yourself"));
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = { ConnectionRequestModel };
