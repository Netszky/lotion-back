const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({
      auth: false,
      token: null,
      message: "No Token",
    });
  }
  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: "Unauthorized",
        verified: false,
      });
    }
    req.user = decoded;
    next();
  });
};
module.exports = verifyToken;
