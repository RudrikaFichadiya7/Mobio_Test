const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({dest: './uploads'});
var fs = require('file-system');
const userRoutes = require('./routes/user');

mongoose.connect(
  "mongodb://localhost:27017/Mobio_Test",
  {useNewUrlParser: true,
  useUnifiedTopology: true}
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//To call route of user
app.use("/user", userRoutes);

// app.use(multer({ dest: './uploads/',
//   rename: function (profileImage, filename) {
//     return filename;
//   },
// }));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
