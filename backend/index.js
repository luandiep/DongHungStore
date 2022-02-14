const express = require("express");
const ImageUploadProduct = require("./ImageUpload/ImageProduct");
var fs = require("fs");
// import data from "./data.js";
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const db = require("./models");
require("dotenv").config();

//Routers
const usersRouter = require("./routes/Users");
app.use("/api/auth", usersRouter);
const catalogRouter = require("./routes/Category");
app.use("/api/category", catalogRouter);
const productRouter = require("./routes/Product");
app.use("/api/product", productRouter);
const unitRouter = require("./routes/Unit");
app.use("/api/unit", unitRouter);
app.post("/upload", ImageUploadProduct.ProductImage);

const path = require("path");
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/Images", express.static(path.join(__dirname, "Images")));

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server at http://localhost:3001");
  });
});
module.exports = app;
