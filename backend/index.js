const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./api/config/dbConnect");
const { notFound, errHandler } = require("./api/middlewares/errorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to database
dbConnect();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
const authRoute = require("./api/routes/user");
const productRoute = require("./api/routes/product");
const categoryRoute = require("./api/routes/category");
const colorRoute = require("./api/routes/color");
const brandRoute = require("./api/routes/brand");
const sizeRoute = require("./api/routes/size");
const enqRoute = require("./api/routes/enq");
const uploadRoute = require("./api/routes/uplaodImage");

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/color", colorRoute);
app.use("/api/brand", brandRoute);
app.use("/api/size", sizeRoute);
app.use("/api/enquiry", enqRoute);
app.use("/api/upload", uploadRoute);

// Error handling middleware
app.use(notFound);
app.use(errHandler);

// Default route
app.get("/", (req, res) => {
res.json("Server is running");
});

// Start the server
app.listen(PORT, () => {
console.log(`Server is running at ${PORT}`);
});