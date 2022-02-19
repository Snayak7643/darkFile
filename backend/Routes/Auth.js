const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Models/User");

//Router for SignIn
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "Plaese Fill all the details! " });
  }
  const func = async () => {
    try {
      const savedUser = await User.findOne({ email });
      if (savedUser && savedUser.password === password) {
        return res.json({ message: "You are Successfully Logged In !" });
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
    const user = new User({ name, email, password });
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
