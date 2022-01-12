const express = require("express");
const ImageUploadProduct = require("./ImageUpload/ImageProduct");

// import data from "./data.js";
const app = express();
const cors = require("cors");

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
const productRouter = require("./routes/Product");
app.use("/api/product", productRouter);

app.post("/upload", ImageUploadProduct.ProductImage);
app.use(express.static(__dirname + "/uploads"));
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server at http://localhost:3001");
  });
});
module.exports = app;
