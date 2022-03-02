const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Post = require("../Models/Post");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../keys");
const jwt = require("jsonwebtoken");
const RequiredSignIn = require("../Middlewares/RequiredSignIn");
const { route } = require("express/lib/application");
const res = require("express/lib/response");

//Router for SignIn
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Plaese Fill all the details! " });
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
      return res.status(422).json({ error: "Invalid UserId or Password ! " });
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
    return res.status(422).json({ error: "Please Fill all the details!" });
  }
  const func = async () => {
    const SavedUser = await User.findOne({ email });
    if (SavedUser) {
      return res.status(422).json({ error: "You are Already Registered!" });
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

//create post route
router.post("/createpost", RequiredSignIn, (req, res) => {
  const { title, pic } = req.body;
  const postedBy = req.user._id;
  if (!title || !pic) {
    return res.json({ error: "All the details are required to post" });
  }
  const post = new Post({ title, pic, postedBy });
  post
    .save()
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      res.json(error);
    });
});

//All posts Route
router.get("/allposts", RequiredSignIn, (req, res) => {
  const _id = req.user._id;
  const func = async () => {
    const posts = await Post.find({ postedBy: _id });
    res.json(posts);
  };
  func();
});

//profile route
router.get("/profile", RequiredSignIn, (req, res) => {
  const { name, email, _id } = req.user;
  res.json({ _id, name, email });
});

//update profile route
router.post("/updateprofile", RequiredSignIn, (req, res) => {
  const { name, password } = req.body;
  const _id = req.user._id;
  if (!name || !password) {
    return res.json({ error: "Please Fill all the Details!!" });
  }
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      User.findOneAndUpdate(
        { _id },
        { $set: { name, password: hashedPassword } }
      ).exec(function (err, user) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.json({ message: "Profile Updated", user });
        }
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

//delete post route
router.post("/deletepost", RequiredSignIn, (req, res) => {
  const { _id } = req.body;
  Post.findByIdAndDelete({ _id })
    .then(function (post) {
      res.json({ message: "post deleted" });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = router;
