const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
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
const authRoute = require("./routes/user");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const colorRoute = require("./routes/color");
const brandRoute = require("./routes/brand");
const sizeRoute = require("./routes/size");
const enqRoute = require("./routes/enq");
const uploadRoute = require("./routes/uplaodImage");

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
app.use(errorHandler);

// Default route
app.get("/", (req, res) => {
res.send("Server is running");
});

// Start the server
app.listen(PORT, () => {
console.log(`Server is running at ${PORT}`);
});