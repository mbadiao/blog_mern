const mongoose = require("mongoose");

const PostShema = mongoose.Schema(
  {
    title: {
      type: String,
      min: 1,
      require: true,
    },
    summary: {
      type: String,
      min: 1,
      require: true,
    },
    content: {
      type: String,
      min: 1,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostShema);
module.exports = Post;
