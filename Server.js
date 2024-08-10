const express = require("express");
const morgan = require("morgan");
const db = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");


// routes path
const authRoutes = require("./routes/authRoutes");
// Load environment variables
dotenv.config();

//MongoDb Connect
connectDB();

const port = process.env.PORT || 8080;

// Rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

//api routes
app.use("/api/v1/auth", authRoutes);

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Listening on port ${port}!`.bgCyan));
