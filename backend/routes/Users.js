const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const randToken = require("rand-token");
const authMethod = require("../auth/auth.methods");
const authController = require("../auth/auth.controllers");
const authMiddleware = require("../auth/auth.middlewares");
const jwtVariable = require("../variables/jwt");
const { validateToken } = require("../middlewares/AuthMiddlewares");
router.post("/register", async (req, res) => {
  const username = req.body.username.toLowerCase();
  const user = await users.findOne({
    where: { username: username },
  });
  if (user) res.status(409).send("Tên tài khoản đã tồn tại.");
  else {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const createUser = users.create({
        username: username,
        password: hash,
      });
      if (!createUser) {
        return res
          .status(400)
          .send("Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.");
      }
      return res.send({
        username,
      });
    });
  }
});
router.post("/refresh", authController.refreshToken);
router.post("/login", async (req, res) => {
  const username = req.body.username.toLowerCase() || "test";
  const password = req.body.password || "12345";
  const user = await users.findOne({
    where: { username: username },
  });
  if (!user) {
    return res.status(401).send("Tên đăng nhập không tồn tại.");
  }
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.status(401).send("Mật khẩu không chính xác.");
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const dataForAccessToken = {
      username: user.username,
      id: user.id,
    };
    const accessToken = authMethod.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      return res
        .status(401)
        .send("Đăng nhập không thành công, vui lòng thử lại.");
    }

    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên

    if (!user.refreshToken) {
      user.refreshToken = refreshToken;
      // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
      users
        .update({ refreshToken: refreshToken }, { where: { id: user.id } })
        .then((result) => {
          return res.json({
            msg: "Đăng nhập thành công.",
            accessToken,
            refreshToken,
            user,
          });
        })
        .catch((err) => {
          return res
            .status(400)
            .send("Có lỗi trong quá trình update refreshToken ");
        });
    } else {
      // Nếu user này đã có refresh token thì lấy refresh token đó từ database
      refreshToken = user.refreshToken;
      return res.json({
        msg: "Đăng nhập thành công.",
        accessToken,
        refreshToken,
        user,
      });
    }

    // const accessToken = jwt.sign(
    //   { username: user.username, id: user.id },
    //   "importantsecret"
    // );
    // res.json({ token: accessToken, username: user.username });
  });
});
router.get("/auth", validateToken, async (req, res) => {
  res.json(req);
});

const isAuth = authMiddleware.isAuth;

router.get("/getbyid", isAuth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
