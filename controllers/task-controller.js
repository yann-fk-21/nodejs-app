const Task = require("../models/task");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    // console.log(tasks);

    return res.render("todo-app", {
      pageTitle: "Todo page",
      path: "/",
      tasks: tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postTasks = async (req, res, next) => {
  const taskTitle = req.body.title;

  try {
    const createdTask = new Task({
      title: taskTitle,
      completed: false,
    });
    await createdTask.save();
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;

  try {
    await Task.findByIdAndDelete(taskId);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
