const express = require("express");
const taskController = require("../controllers/task-controller");

const router = express.Router();

router.get("/", taskController.getTasks);
router.post("/add-task", taskController.postTasks);
router.post("/deleted-task/:taskId", taskController.deleteTask);

module.exports = router;
