const { validationResult } = require("express-validator");

const Post = require("../models/post");
const User = require("../models/user");

const fileHelper = require("../utils/file");

exports.createdPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Went something wrong!");
    error.statusCode = errors.status || 500;
    throw error;
  }

  const postTitle = req.body.title;
  const postContent = req.body.content;
  const image = req.file;

  if (!image) {
    const error = new Error("Please, pick image");
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = image.path;
  const post = new Post({
    title: postTitle,
    content: postContent,
    imageUrl: imageUrl,
    author: req.userId,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({ message: "post is created!", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      err.message = "Went something wrong";

      next(err);
    });
};

exports.getPosts = async (req, res, next) => {
  const page = req.query.page;
  const ITEMS_PER_PAGE = 2;

  try {
    const foundPosts = await Post.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    let totalItems = await Post.find().countDocuments();
    res
      .status(200)
      .json({ message: "posts", posts: foundPosts, totalItems: totalItems });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.body.postId;

  try {
    const foundPost = await Post.findOne(postId);
    if (!foundPost) {
      const error = new Error("Not found post!");
      error.statusCode = 404;
      throw error;
    }

    if (req.userId.toString() !== foundPost.author.toString()) {
      const error = new Error("Not Authorized!");
      error.statusCode = 401;
      throw error;
    }

    fileHelper.deleteFile(foundPost.imageUrl);
    await Post.deleteOne(postId);

    res.status(204).json({ message: "Post deleted!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatedLikePost = async (req, res, next) => {
  const postId = req.body.postId;

  try {
    const foundPost = await Post.findOne(postId);
    if (!foundPost) {
      const error = new Error("Not found post!");
      error.statusCode = 404;
      throw error;
    }

    const creatorPost = await User.findById(foundPost.author);
    creatorPost.favoritePosts.push(foundPost);
    foundPost.numberOfLikes += 1;

    const post = await foundPost.save();
    await creatorPost.save();

    res.status(200).json({ message: "post liked!", post: post });
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
    }

    next(err);
  }
};
