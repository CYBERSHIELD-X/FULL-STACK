const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("No Token. Access Denied ❌");
  }

  try {
    const decoded = jwt.verify(token, "mysecretkey");
    req.user = decoded;
    next();
  } catch {
    res.status(400).send("Invalid Token ❌");
  }
};
