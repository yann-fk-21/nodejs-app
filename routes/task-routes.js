const express = require("express");
const taskController = require("../controllers/task-controller");

const router = express.Router();

router.get("/", taskController.getTaskPage);
router.post("/tasks", taskController.postTasks);

module.exports = router;
