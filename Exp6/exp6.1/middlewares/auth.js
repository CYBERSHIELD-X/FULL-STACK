const auth = (req, res, next) => {

  const token = req.headers["authorization"];

  if (!token || token !== "mysecrettoken") {
    return res.status(401).send("Unauthorized Access ❌");
  }

  next(); // allow request
};

module.exports = auth;
