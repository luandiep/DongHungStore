const express = require("express");
const fs = require("fs");
// import data from "./data.js";
const app = express();
const cors = require("cors");
//upload image
const multer = require("multer");
const path = require("path");
var maxSize = 1 * 1000 * 1000;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
      const a = "/Images/" + file.originalname;
      fs.exists("Images/" + file.originalname, function (exists) {
        if (exists) {
          cb(null, false);
        } else {
          cb(null, true);
        }
      });
    } else {
      return cb(null, false, new Error("I don't have a clue!"));
    }
  },
}).single("image");

app.use(express.json());
app.use(cors());
const db = require("./models");
require("dotenv").config();

//Routers
const postRouter = require("./routes/Posts");
app.use("/api/posts", postRouter);
const usersRouter = require("./routes/Users");
app.use("/api/auth", usersRouter);
const catalogRouter = require("./routes/Catalog");
app.use("/api/catalog", catalogRouter);
const productRouter = require("./routes/Posts");
app.use("/api/product", productRouter);

app.post("/upload", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("some error");
    } else {
      res.json(req.file.filename);
    }
  });
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server at http://localhost:3001");
  });
});
module.exports = app;
