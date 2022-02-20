const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", Post);
