const express = require("express");
const router = express.Router();
const { category } = require("../models");
const { subcategory } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

const Sequelize = require("sequelize");
const { parse } = require("../ModelMapper/categoryMapper");
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
  const categoryModel = parse(req.body);
  if (!categoryModel) return res.status(400).send("Bad Request");
  else {
    const categoryModel = await category.findOne({
      where: { name: categoryModel.name },
    });

    if (categoryModel) {
      res.status(400).send("Danh  mục đã tồn tại");
    } else {
      await category.create(categoryModel);
      if (categoryModel.id_subcategory) {
        subcategory.create({
          id_category: categoryModel.id_subcategory,
          id_subcategory: categoryModel.id_category,
        });
      }
      res.send("oke");
    }
  }
});

module.exports = router;
