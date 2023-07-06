const Auth = require("../models/auth");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
//verify jwt token
exports.authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    console.log("TOKEN",token)
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Auth.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized, Token Expired, Please Login Again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

// Check if user is admin or not
exports.isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user; //on above, I store user in req.user, get email from there
  const adminUser = await Auth.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin!");
  } else {
    next();
  }
});
