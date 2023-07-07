const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const app = express();
const { notFound, errHandler } = require("./middlewares/errorHandler");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


const authRoute = require("./routes/user");
app.use("/api/user", authRoute);

const productRoute = require("./routes/product");
app.use("/api/product", productRoute);

const categoryRoute = require("./routes/category");
app.use("/api/category", categoryRoute);

const colorRoute = require("./routes/color");
app.use("/api/color", colorRoute);

const brandRoute = require("./routes/brand");
app.use("/api/brand", brandRoute);

const sizeRoute = require("./routes/size");
app.use("/api/size", sizeRoute);

const enqRoute = require("./routes/enq");
app.use("/api/enquiry", enqRoute);

const uploadRoute = require("./routes/uplaodImage");
app.use("/api/upload", uploadRoute);

app.use(notFound);
app.use(errHandler);

// Configure the reverse proxy middleware to proxy requests to the Vite app
app.get("/", (req, res) => {
  res.json('server is running')
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
