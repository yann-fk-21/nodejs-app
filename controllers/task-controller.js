exports.getTaskPage = (req, res, next) => {
  return res.render("todo-app", {
    pageTitle: "Todo page",
    path: "/",
  });
};
