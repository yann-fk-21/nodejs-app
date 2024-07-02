const Task = require("../models/task");

exports.getTaskPage = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    console.log(tasks);

    return res.render("todo-app", {
      pageTitle: "Todo page",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postTasks = async (req, res, next) => {
  const { taskTitle, TaskDescription, TaskStatus } = req.body;

  try {
    const createdTask = new Task({
      title: taskTitle,
      description: TaskDescription,
      status: TaskStatus,
    });
    await createdTask.save();
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
