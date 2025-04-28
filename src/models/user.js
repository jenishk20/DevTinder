const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    photoURL: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid");
        }
      },
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "This is a default about me",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
