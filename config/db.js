const { default: mongoose } = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Mongodb DataBase ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`mongoDb Database Error ${error}`.bgRed.white);
  }
};
module.exports = connectDB;
