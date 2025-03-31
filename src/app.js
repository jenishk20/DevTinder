const express = require("express");
require("dotenv").config();
const { adminAuth, userAuth } = require("./middleware/auth");
const { connect } = require("./config/database");
const { User } = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Aks",
    lastName: "Kumar",
    age: 21,
    email: "aks.kumar@northeastern.edu",
    password: "aks123",
    gender: "M",
  };

  try {
    const user = new User(userObj);
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).error("Error in creating user");
  }
  // Creating a new instance of a user model.
});

// app.get("/getUserData", (req, res) => {
//   throw new Error("This is a test error");
//   res.send("This is the user data");
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("There was an error");
//   }
// });

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
