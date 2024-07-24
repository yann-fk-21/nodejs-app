const express = require("express");
const { body } = require("express-validator");

const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post(
  "/posts",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 6 }),
  ],
  isAuth,
  postController.createdPost
);

router.get("/posts", postController.getPosts);

router.delete("/posts/:postId", isAuth, postController.deletePost);

router.put("/posts/:postId/likes", isAuth, postController.updatedLikePost);

module.exports = router;
