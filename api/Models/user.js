const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    require: true,
    min: 1,
  },
  lastname: {
    type: String,
    require: true,
    min: 1,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    require: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
