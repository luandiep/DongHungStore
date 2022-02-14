const express = require("express");
const router = express.Router();
const { category } = require("../models");
const { subcategory } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

const Sequelize = require("sequelize");
const { parse } = require("../ModelMapper/categoryMapper");
const crypto = require("crypto");

function formatSpace(val) {
   
  var space = "";
  for (let index = 0; index < val; index++) {
    space += "\u00A0 \u00A0 ";
  }
  return space;
}

function formatCategory(categoryes, ParentId = null) {
  const categorylist = [];

  let category;
  if (ParentId == null) {
    category = categoryes.filter((cat) => cat.ParentId == null);
  } else {
    category = categoryes.filter((cat) => cat.ParentId == ParentId);
  }

  for (let cate of category) {
    categorylist.push({
      Id: cate.Id,
      ParentId: cate.ParentId,
      Code: cate.Code,
      Name: cate.Name,
      Description: cate.Description,
      Grade: cate.Grade,
      Space: cate.Grade>1?formatSpace(cate.Grade):"",
      children: formatCategory(categoryes, cate.Id),
    });
  }

  return categorylist;
}

function loopValues(val) {
  let q = [];
  val.forEach((elm) => {
    if (elm == null) {
      return;
    }

    const { children, ...rest } = elm;
    q = [...q, rest, ...loopValues(children)];
  });
  return q;
}

router.get("/getall", async (req, res) => {
  const data = await category.findAll({
    raw: true,
    nest: true,
  });

  const output = loopValues(formatCategory(data, null));
  console.log(output);
  res.json(output);
});

router.post("/add", validateToken, async (req, res) => {
  const categoryModel = parse(req.body);
  if (!categoryModel) return res.status(400).send("Bad Request");
  else {
    const lisOfPosts = await category.findOne({
      where: { Code: categoryModel.Code },
    });

    if (lisOfPosts) {
      res.status(400).send("Danh mục đã tồn tại");
    } else {
      if (categoryModel.ParentId) {
        const parentId = await category.findOne({
          where: { Id: categoryModel.ParentId },
        });
        if (parentId) {
          categoryModel.Grade = parentId.Grade + 1;
          categoryModel.Id = crypto.randomUUID();
          await category.create(categoryModel);
          res.status(200).send("OK");
        }
      } else {
        categoryModel.Grade = 1;

        categoryModel.Id = crypto.randomUUID();

        await category.create(categoryModel);
        res.status(200).send("OK");
      }
    }
  }
});

module.exports = router;
