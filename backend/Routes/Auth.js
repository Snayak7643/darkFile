const express = require("express");
const router = express.Router();

//Router for SignIn
router.get("/signin", (req, res) => {
  res.json({ message: "You are in SignIn" });
});

//Router for SignUp
router.get("/signup", (req, res) => {
  res.json({ messgae: "Your are in SignUp" });
});

module.exports = router;
