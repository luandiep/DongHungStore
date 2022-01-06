const express = require("express");
const router = express.Router();
const { product } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
router.post("/add", validateToken, async (req, res) => {
  const { name, catalog_id, content } = req.body;
  if (!req.body) return res.status(400).send("Bad Request");
  else {
    await product.create({
      name: name,
      catalog_id: catalog_id,
      content: content,
    });
    res.send("oke");
  }
});
