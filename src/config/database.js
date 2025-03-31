const mongoose = require("mongoose");
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
};

module.exports = { connect };
