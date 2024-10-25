const userModel = require("../models/userModel");

const errorResponse = require("../utils/errorResponse");
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

//register function
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = res.body;
    //existing user
    const existingEmail = await username.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email Is Already registered", 500));
    }
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//login function
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = res.body;

    //Validation
    if (!email && !password) {
      return next(new errorResponse("Please fill the email and password"));
    }

    const users = await username.findOne({ email });

    if (!user) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    const isMatch = await userModel.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials", 401));
    }

    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//logout
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};
