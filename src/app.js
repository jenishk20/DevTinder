const express = require("express");
require("dotenv").config();
const validator = require("validator");
const { userAuth } = require("./middleware/auth");
const { connect } = require("./config/database");
const { User } = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validating Data
    validateSignupData(req);
    // Encrypt Data
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const userObj = req.body;

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const userLName = req.body.lastName;
    const user = await User.find({ lastName: userLName });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Error in fetching user");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send("Error in fetching users");
  }
});

app.patch("/user/:userId", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password || !validator.isEmail(emailId)) {
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = await user.getJWT();
    // Cookie logic
    res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
    res.send("Login successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  res.send("This is the send connection request route");
});

// ======================================== ======================== ================= //

// app.use("/admin", adminAuth);
// app.use("/user/login", (req, res, next) => {
//   res.send("This is the user login route");
// });

// app.use("/user", userAuth, (req, res, next) => {
//   res.send("This is the user route");
// });

// app.get("/admin/getAllData", (req, res) => {
//   res.send("This is the admin data");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("This is the admin delete user route");
// });

// ======================================== ======================== ================= //

// Request handler
// Great practice question for JS
// Ways of defining
// app.use(
//   "/test",
//   (req, res, next) => {
//     console.log("Handling the route user");
//     next();
//     // res.send("This is the first middleware");
//   },
//   (req, res, next) => {
//     console.log("This is the second middleware");
//     next();
//     // res.send("2nd middleware");
//   },
//   (req, res, next) => {
//     console.log("This is the third middleware");
//     next();
//     // res.send("3rd middleware");
//   },
//   (req, res, next) => {
//     console.log("This is the fourth middleware");
//     // res.send("4th middleware");
//     next();
//   }
// );

connect()
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
