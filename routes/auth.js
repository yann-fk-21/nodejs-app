const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
// const User = require("../models/user");

const router = express.Router();

router.post(
  "/auth/signup",
  [
    body("email").isEmail().normalizeEmail(),
    body("name").trim().isLength({ min: 4 }),
    body("password").trim().isLength({ min: 6 }),
  ],
  authController.signup
);

router.post(
  "/auth/signin",
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
  ],
  authController.signin
);

module.exports = router;
