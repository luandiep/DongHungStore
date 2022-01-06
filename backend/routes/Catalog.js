const express = require("express");
const router = express.Router();
const { catalog } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

router.get("/getall", async (req, res) => {
  const lisOfPosts = await catalog.findAll();
  res.json(lisOfPosts);
});

router.post("/add", validateToken, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send("Bad Request");
  else {
    await catalog.create({ name: name });
    res.send("oke");
  }
});
module.exports = router;
