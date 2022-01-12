const express = require("express");
const router = express.Router();
const { product } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
router.post("/add", validateToken, async (req, res) => {
  const { name, catalog_id, content, image_link } = req.body.product;
  if (!req.body) return res.status(400).send("Bad Request");
  else {
    await product.create({
      name: name,
      catalog_id: catalog_id,
      content: content,
      image_link: image_link,
    });
    return res.send("oke");
  }
});
module.exports = router;
