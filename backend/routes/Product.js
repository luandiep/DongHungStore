const express = require("express");
const router = express.Router();
const { product } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

router.post("/add", validateToken, async (req, res) => {
  const { Name, Id_Category, Price, Content, Image_link, Unit_Id, Code } =
    req.body;
  if (!req.body) return res.status(400).send("Bad Request");
  else {
    await product
      .create({
        Name: Name,
        Id_Category: Id_Category,
        Content: Content,
        Image_link: Image_link,
        Price: Price,
        Unit_Id: Unit_Id,
        Code: Code,
      })
      .then(() => {
        return res.status(200).send("oke");
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  }
});

router.post("/update", validateToken, async (req, res) => {
  const { Name, Id_Category, Price, Content, Image_link, Unit_Id, Code, id } =
    req.body;
  if (!req.body) return res.status(400).send("Bad Request");
  else {
    await product
      .update(
        {
          Name: Name,
          Id_Category: Id_Category,
          Content: Content,
          Image_link: Image_link,
          Price: Price,
          Unit_Id: Unit_Id,
          Code: Code,
        },
        { where: { id: id } }
      )
      .then(() => {
        return res.status(200).send("oke");
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  }
});

router.get("/getall", async (req, res) => {
  await product
    .findAll({
      raw: true,
      nest: true,
    })
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.get("/getbyid", async (req, res) => {
  await product
    .findOne({
      where: { Id: req.query.id },
    })
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
