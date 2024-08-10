const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controller/authController");
const Router = express.Router();

Router.get("/register", registerController);
Router.get("/login", loginController);
Router.get("/logout", logoutController);

module.exports = Router;