const express = require("express");
const App = express();
const PORT = 3500;
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const AuthRouter = require("./Routes/Auth");

//DB Connection
mongoose.connect(MONGOURI);
mongoose.connection.on("connected", () => {
  console.log("Connected to DataBase");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

//Middlewares
App.use(express.json());
App.use(AuthRouter);

//Router
App.get("/", (req, res) => {
  res.json({ message: "HOME" });
});

//listening to the server
App.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
