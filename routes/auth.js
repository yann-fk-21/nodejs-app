const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: req.body.email }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email addres already exist");
          }
        });
      })
      .normalizeEmail(),
    body("name").trim().not().isEmpty(),
    body("password").trim().isLength({ min: 6 }),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
