require("dotenv").config();
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

// routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

// file storage function
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
    // console.log(file);
  },

  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + "-" + file.originalname);
    // console.log(file);
  },
});

//  file filter function
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    callback(null, true);
    // console.log("Accepter");
  } else {
    callback(null, false);
    // console.log("Refuser");
  }
};

// middleware
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1", postRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

// error middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  let errorData;
  if (error.data) {
    errorData = error.data;
  }
  const message = error.message || "Went something wrong!";
  return res.status(status).json({ message: message, errorData: errorData });
});

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Database connection successfully");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
