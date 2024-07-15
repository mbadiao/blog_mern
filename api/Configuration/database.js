const mongoose = require("mongoose");
const DataBaseConnexion = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log("error while connected to mongodb", error);
  }
};

module.exports = DataBaseConnexion;
