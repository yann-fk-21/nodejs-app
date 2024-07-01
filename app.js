require("dotenv").config();
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "images")));

const taskRoutes = require("./routes/task-routes");

app.use(taskRoutes);

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected!");
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err, process.env.MONGODB_URI);
  });
