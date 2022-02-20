const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../keys");
const jwt = require("jsonwebtoken");

//Router for SignIn
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "Plaese Fill all the details! " });
  }
  const func = async () => {
    try {
      const savedUser = await User.findOne({ email });
      if (savedUser) {
        const check = await bcrypt.compare(password, savedUser.password);
        if (check) {
          const token = await jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          return res.json({
            message: "You are Successfully Logged In !",
            token,
            user: { name: savedUser.name, email: savedUser.email },
          });
        }
      }
      return res.status(422).json({ message: "Invalid UserId or Password ! " });
    } catch (err) {
      console.log(err);
    }
  };
  func();
});

//Router for SignUp
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ message: "Please Fill all the details!" });
  }
  const func = async () => {
    const SavedUser = await User.findOne({ email });
    if (SavedUser) {
      return res.status(422).json({ message: "You are Already Registered!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    user
      .save()
      .then((user) => {
        res.json({ message: "Now You can Login, " + user.name });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  func();
});

module.exports = router;
