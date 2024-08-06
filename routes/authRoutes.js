const express = require('express');
const { registerController, loginController, logoutController } = require('../controller/authController');
const Router = express.Router();

app.get("/register", registerController);
app.get("/login", loginController);
app.get("/logout", logoutController);


module.exports = Router