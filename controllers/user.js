const User = require("../models/user");

exports.updatedUser = async (req, res, next) => {
  const emailUser = req.body.email;

  try {
    const foundUser = await User.findById(req.userId);
    if (!foundUser) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    foundUser.email = emailUser;
    await foundUser.save();
    res.status(200).json({ message: "User is updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
