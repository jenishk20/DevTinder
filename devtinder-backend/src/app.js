const express = require("express");
require("dotenv").config();
const { connect } = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const userConnectionsRouter = require("./routes/userConnections");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userConnectionsRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);

connect()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
