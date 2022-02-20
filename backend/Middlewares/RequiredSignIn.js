const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const User = require("../Models/User");

const RequiredSignIn = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(402).json({ message: "You must have to Log In First" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (error, decode) => {
    if (error) {
      return res.json({ message: "You must have to Log In First" });
    }
    const _id = decode._id;
    User.findById(_id).then((user) => {
      req.user = user;
      console.log(user);
      next();
    });
  });
};

module.exports = RequiredSignIn;
