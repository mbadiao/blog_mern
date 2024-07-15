const express = require("express");
const router = express.Router();

const {
  login,
  register,
  logout,
  profile,
} = require("../controllers/authController");
const {
  addPost,
  getAllPost,
  getOnePost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/profile", profile);
router.get("/post", getAllPost);
router.get("/post/:id", getOnePost);
router.post("/post", addPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);
module.exports = router;
