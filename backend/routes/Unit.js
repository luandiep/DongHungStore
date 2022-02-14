const express = require("express");
const router = express.Router();
const { unit } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const crypto = require("crypto");
router.get("/getall", async (req, res) => {
  const lisOfPosts = await unit.findAll();
  res.json(lisOfPosts);
});

router.post("/add", validateToken, async (req, res) => {
  const { Name, Description } = req.body;
  if (!Name) return res.status(400).send("Bad Request");
  else {
    const Getname = await unit.findOne({
      where: { Name: Name },
    });
    if (Getname) {
      res.status(400).send("Đơn vị tính đã tồn tại");
    } else {
      await unit.create({
        Id: crypto.randomUUID(),
        Name: Name,
        Description: Description,
      });
      res.  send("oke");
    }
  }
});
module.exports = router;
