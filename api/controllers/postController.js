const asyncHandler = require("express-async-handler");
const Post = require("../Models/post");
const jwt = require("jsonwebtoken");

// Add Post
const addPost = asyncHandler(async (req, res) => {
  const { title, summary, content, image } = req.body;
  const imageurl = `${process.env.IMAGE_ENDPOINT}${process.env.IMAGE_BUCKET_ID}/files/${image}/view?project=${process.env.IMAGE_PROJECT_ID}`;

  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) return res.json(err);
      const post = new Post({
        title,
        summary,
        content,
        image: imageurl,
        user: info.userId,
      });

      const createdPost = await post.save();
      res.status(201).json(createdPost);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Posts
const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("user", "firstname lastname username")
    .sort({ createdAt: -1 });
  res.json(posts);
});

// Get One Post
const getOnePost = asyncHandler(async (req, res) => {
  const posts = await Post.findById(req.params.id).populate(
    "user",
    "firstname lastname username"
  );
  if (!posts) {
    return res.status(404).json({ message: "post not found" });
  }
  res.json(posts);
});

// Update Post
const updatePost = asyncHandler(async (req, res) => {
  const { title, summary, content, image } = req.body;
  const imageurl = `${process.env.IMAGE_ENDPOINT}${process.env.IMAGE_BUCKET_ID}/files/${image}/view?project=${process.env.IMAGE_PROJECT_ID}`;

  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) return res.status(403).json(err);

      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.user.toString() !== info.userId) {
        return res.status(403).json({ message: "You do not have permission to update this post" });
      }

      post.title = title || post.title;
      post.summary = summary || post.summary;
      post.content = content || post.content;
      post.image = image ? imageurl : post.image;

      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Post
const deletePost = asyncHandler(async (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
      if (err) return res.status(403).json(err);

      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.user.toString() !== info.userId) {
        return res.status(403).json({ message: "You do not have permission to delete this post" });
      }

      await post.remove();
      res.status(200).json({ message: "Post deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { addPost, getAllPost, getOnePost, updatePost, deletePost };
