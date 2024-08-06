const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookie = require("cookie");
// models
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [6, "Password Length should be 6 characters long"],
  },
  customerId: {
    type: String,
    default: "",
  },
  subscription: {
    type: String,
    default: "",
  },
});

//hashed password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

//match password
userSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

//Sign Token
userSchema.methods.getSignedToken = function (res) {
  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACEESS_EXPIREIN }
  );

  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXPIRIEN }
  );
  res.cookie("refreshToken", `${refreshToken}` , {maxAge : 86480* 7000 , httpOnly: true});
};

const User = mongoose.model("User", userSchema);

module.exports = User;
