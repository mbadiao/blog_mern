const asyncHandler = require("express-async-handler");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { userId: user._id, admin: user.isAdmin },
      process.env.SECRET
    );
    return res
      .status(200)
      .cookie("token", token)
      .json({ data: { user }, message: "Login successful" });
  }
  return res.status(401).json({ message: "Invalid email or password" });
});

const register = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  try {
    const existedUser = await User.findOne({ username });
    if (existedUser)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: user._id, admin: user.isAdmin },
      process.env.SECRET
    );
    res
      .status(201)
      .cookie("token", token)
      .json({ data: { user }, message: "Register successful." });
  } catch (error) {
    res.status(401).json({ message: "Error while trying to register." });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.status(200).cookie("token", "").json({ message: "Logout successful" });
});

const profile = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
    if (err) return res.json(err);
    const user = await User.findById(info.userId);
    res.json(user);
  });
};

module.exports = { login, logout, register, profile };
