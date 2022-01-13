const express = require("express");
const router = express.Router();
const { category } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/getall", async (req, res) => {
  const lisOfPosts = await category.findAll();
  res.json(lisOfPosts);
});
router.get("/getalls", async (req, res) => {
  const a = await category.findAll({
    where: {
      name: {
        [Op.like]: "%" + "bo bit t" + "%",
      },
    },
  });
  res.json(a);
});

router.post("/add", validateToken, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send("Bad Request");
  else {
    await category.create({ name: name });
    res.send("oke");
  }
});
module.exports = router;
