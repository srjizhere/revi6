const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    const decoded = jwt.verify(token, SECRET);
    if (decoded) {
      next();
    } else {
      res.send("Please login first");
    }
  } else {
    res.send("Wrong Credentials");
  }
};

module.exports = { authenticate };
