const jwtVariable = require("../variables/jwt");
const authMethod = require("../auth/auth.methods");
const validateToken = async (req, res, next) => {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.x_authorization;
  if (!accessTokenFromHeader) {
    return res.status(401).send("Không tìm thấy access token!");
  }

  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

  const verified = await authMethod.verifyToken(
    accessTokenFromHeader,
    accessTokenSecret
  );
  if (!verified) {
    return res.status(401).send("Invalid Token");
  } else {
    // const dcode1 = res.json(verified.payload);
    // const dcode2 = (req.user = verified.payload);
    return next();
  }
};
module.exports = { validateToken };
