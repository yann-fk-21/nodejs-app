const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid inputs");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  try {
    const foundUser = await User.findOne({ email: userEmail });
    if (foundUser) {
      const error = new Error("user already exist, please sign in");
      error.statusCode = 422;
      throw error;
    }

    const hashPassword = await bcrypt.hash(userPassword, 12);
    const createdUser = new User({
      email: userEmail,
      password: hashPassword,
      name: userName,
    });
    const newUser = await createdUser.save();
    res
      .status(201)
      .json({ message: "User is created successfully", user: newUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid inputs");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const foundUser = await User.findOne({ email: userEmail });
    if (!foundUser) {
      const error = new Error("user not found, please sign up!");
      error.statusCode = 404;
      throw error;
    }

    isEqual = await bcrypt.compare(userPassword, foundUser.password);
    if (!isEqual) {
      const error = new Error("credentials is false!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
      },
      "topsecret237",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "login successfully",
      token: token,
      userId: foundUser._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
