const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./database/db");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const users = require("./controllers/users");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  users.getAllUsers(req, res, db);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

module.exports = app;
