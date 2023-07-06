const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./email");
const crypto = require("crypto");
const Auth = require("../models/auth");
const Order = require("../models/order");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//Register user
exports.createUser = asyncHandler(async (req, res) => {
  //check if user us alreay exist
  const { email, password, mobile } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // Validate password length (at least 6 characters)
  if (password.length < 6) {
    throw new Error("Password should be at least 6 characters long");
  }

  const findUser = await User.findOne({ email });
  if (!findUser) {
    //if not found then create a new user
    const newUser = await User.create(req.body);
    res.json({
      success: true,
      message: "User created Successfully",
      newUser,
    });
  } else {
    // user already exist
    throw new Error("User Already Exixts");
  }
});

//Login user
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const findUser = await User.findOne({ email });
  if (!findUser || findUser.role !== "user") {
    throw new Error("Not Authorized, Only user can login from here!");
  }
  // Check if the user is blocked
  if (findUser.isBlocked) {
    throw new Error("You are blocked by Admin!");
  }

  // If user is found and password is matched
  // if (await findUser.isPasswordMatched(password)) {
  //   const refreshToken = await generateRefreshToken(findUser._id);
  //   // const updateUser = await User.findByIdAndUpdate(
  //   //   findUser._id,
  //   //   { refreshToken },
  //   //   { new: true }
  //   // );
  //   return next(new AppError("Email or password incorrect", 400));

  //       // res.cookie("refreshToken", refreshToken, {
  //       //   httpOnly: true,
  //       //   maxAge: 72 * 60 * 60 * 1000,
  //       // });
  // }

  if (!findUser || !(await findUser.isPasswordMatched(password))) {
    throw new Error("Email or password incorrect");
  }

  res.status(200).json({
    _id: findUser._id,
    firstname: findUser.firstname,
    lastname: findUser.lastname,
    email: findUser.email,
    mobile: findUser.mobile,
    role: findUser.role,
    isBlocked: findUser.isBlocked,
    token: generateToken(findUser._id),
  });
});

// Google Login
exports.googleLogin = asyncHandler(async (req, res, next) => {
  const { tokenId } = req.body;

  try {
    // Verify the ID Token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Extract user information from the verified ID Token
    const { email_verified, name, email, picture, sub } = ticket.getPayload();

    if (!email_verified) {
      throw new Error("Email not verified");
    }

    let user = await Auth.findOne({ email }).exec();

    if (user) {
      const token = generateToken(user._id);
      const { _id, name, email, picture, googleId } = user;

      res.json({
        token,
        user: { _id, name, email, picture, googleId },
      });
    } else {
      const newUser = new Auth({
        name,
        email,
        picture,
        googleId: sub,
      });

      user = await newUser.save();

      const token = generateToken(user._id);

      // Update the token for the new user
      user.token = token;

      // Save the updated user with the token
      await user.save();

      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          googleId: user.googleId,
        },
      });
    }
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to verify ID token" });
  }
});

// Logout
exports.googleLogout = asyncHandler(async (req, res, next) => {
  try {
    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ success: false, error: "Failed to logout" });
  }
});

//Login admin
exports.loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email,password);
  //check if admin exists
  const admin = await User.findOne({ email });
  if (!admin) {
    res.status(401).json({ message: "Invalid Credentials" });
    // res.status(401);
    // throw new Error("Invalid Credentials");
  }

  if (admin.role !== "admin") {
    res.status(401);
    throw new Error("Not Authorized, You are not an Admin!");
  }

  const isPasswordMatched = await admin.isPasswordMatched(password);
  if (!isPasswordMatched) {
    res.status(401).json({ message: "Invalid Credentials" });

    // res.status(401);
    // throw new Error("Invalid Credentials");
  }
  //if admin is found and password is matched
  // Generate refresh token
  if (await admin.isPasswordMatched(password)) {
    const refreshToken = await generateRefreshToken(admin?._id);
    const updateuser = await User.findByIdAndUpdate(
      admin?.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: admin?._id,
      firstname: admin?.firstname,
      lastname: admin?.lastname,
      email: admin?.email,
      mobile: admin?.mobile,
      token: generateToken(admin?._id),
    });
  } else {
    // throw new Error("Invalid Credentials");
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

//Handle Refresh Token
exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  //   console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  //   console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No Refresh Token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Something went wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//logout
// exports.logout = asyncHandler(async (req, res) => {
//   const cookie = req.cookies;
//   if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
//   const refreshToken = cookie.refreshToken;
//   const user = await User.findOne({ refreshToken });
//   if (!user) {
//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: true,
//       expires: new Date(0),
//     });
//     return res.sendStatus(204); //forbidden
//   }
//   await User.findOneAndUpdate(
//     { refreshToken },
//     {
//       refreshToken: "",
//     }
//   );
//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     secure: true,
//   });
//   res.sendStatus(204); //forbidden
// });
exports.logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return res.sendStatus(403); // Forbidden
  }

  await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  res.sendStatus(204); // No Content
});

//update user
exports.updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
      mobile: req.body.mobile,
    });

    if (existingUser && existingUser._id.toString() !== _id) {
      return res
        .status(400)
        .json({ message: "Email or mobile number is already in use." });
    }

    const user = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );

    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all users
exports.allUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await Auth.find().populate("wishList");
    res.status(200);
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a single user
exports.singleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await Auth.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete user
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "User Deleted Successfully",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Block user
exports.blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      success: true,
      message: "User is Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Unblock user
exports.unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unBlock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({
      success: true,
      message: "User is unBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update Password
exports.updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

//Generate Token
exports.forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found with this email");
  }
  try {
    const token = await user.createPassowrdResetToken();
    await user.save();
    const resetUrl = `Follow this link to reset your Password. This link is valid for only 10 Minutes. <a href='http://127.0.0.1:5173/resetpassword/${token}'>Reset Password</a>`;
    const data = {
      to: email,
      text: "Hey",
      subject: "Forgot Password Link",
      html: resetUrl,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

//Reset Password
exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Token Expired, Try again later!");
  }
  user.password = password;
  //if password is changed then we undefined these two
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

//Get Wishlist
exports.getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const findUser = await Auth.findById(_id).populate("wishList");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

//save user address
// exports.saveAddress = asyncHandler(async (req, res, next) => {
//   const { _id } = req.user;
//   validateMongodbId(_id);
//   try {
//     const updateUser = await User.findByIdAndUpdate(
//       _id,
//       {
//         address: req?.body?.address,
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(updateUser);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//user cart
// exports.userCart = asyncHandler(async (req, res, next) => {
//   const { productId, color, quantity, price } = req.body;
//   const { _id } = req.user;
//   validateMongodbId(_id);

//   try {
//     let newCart = await new Cart({
//       userId: _id,
//       productId,
//       color,
//       price,
//       quantity,
//     }).save();

//     res.status(201).json(newCart);
//   } catch (error) {
//     // res.status(500).json({ error: "Internal Server Error" });
//     // Or you can rethrow the error if you want to handle it in a global error handler
//     throw new Error(error);
//   }
// });

//get cart
// exports.getCart = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongodbId(_id);

//   try {
//     const cart = await Cart.find({ userId: _id })
//       .populate("productId")
//       .populate("color");

//     res.status(200).json(cart);
//   } catch (error) {
//     // res.status(500).json({ error: "Internal Server Error" });
//     // Or you can rethrow the error if you want to handle it in a global error handler
//     throw new Error(error);
//   }
// });

//removeProductFromCart
// exports.removeProductFromCart = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { cartItemId } = req.params;
//   validateMongodbId(_id);

//   try {
//     const deleteProductFromCart = await Cart.deleteOne({
//       userId: _id,
//       _id: cartItemId,
//     });

//     if (deleteProductFromCart.deletedCount === 0) {
//       res.status(404).json({ error: "Product not found in the cart." });
//     } else {
//       res
//         .status(200)
//         .json({ message: "Product removed from the cart successfully." });
//     }
//   } catch (error) {
//     // Or you can rethrow the error if you want to handle it in a global error handler
//     throw new Error(error);
//   }
// });

//update cart quantity for products
// exports.updateProductQuantityInCart = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { cartItemId, newQuantity } = req.params;
//   validateMongodbId(_id);

//   try {
//     const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });

//     if (!cartItem) {
//       res.status(404).json({ error: "Cart item not found." });
//       return;
//     }

//     cartItem.quantity = newQuantity;
//     await cartItem.save();

//     res.status(200).json(cartItem);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//     // Or you can rethrow the error if you want to handle it in a global error handler
//     // throw new Error(error);
//   }
// });

//empty Cart
// exports.emptyCart = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongodbId(_id);

//   try {
//     const deleteCart = await Cart.deleteMany({
//       userId: _id,
//     });
//     res.json(deleteCart);
//   } catch (error) {
//     // Or you can rethrow the error if you want to handle it in a global error handler
//     throw new Error(error);
//   }
// });

//apply coupon discount
// exports.couponDiscount = asyncHandler(async (req, res) => {
//   const { coupon } = req.body;
//   const { _id } = req.user;
//   validateMongodbId(_id);
//   const checkCoupon = await Coupon.findOne({ name: coupon });
//   if (checkCoupon === null) {
//     throw new Error("Invalid Coupon");
//   }
//   const user = await User.findOne({ _id });
//   let { products, cartTotal } = await Cart.findOne({
//     orderBy: user._id,
//   }).populate("products.product");
//   let totalAfterDiscount = (
//     cartTotal -
//     (cartTotal * checkCoupon.discount) / 100
//   ).toFixed(2);
//   await Cart.findOneAndUpdate(
//     { orderBy: user._id },
//     { totalAfterDiscount },
//     { new: true }
//   );
//   res.json(totalAfterDiscount);
// });

//saveSharedOrder
exports.saveSharedOrder = asyncHandler(async (req, res) => {
  const { sharedProduct, orderFor, orderBy } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const order = await Order.create({
      sharedProduct,
      orderFor,
      orderBy,
      user: _id,
    });
    res.json({
      message: "Order Saved Successfully",
      order: order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//get Orders
// exports.getOrders = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongodbId(_id);
//   try {
//     const orders = await Order.find({ user: _id })
//       .populate("user")
//       .populate("orderItems.product")
//       .populate("orderItems.color");
//     res.status(200).json({ orders });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// //get all orders (ADMIN)
exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      // .populate("orderItems.product")
      // .populate("orderBy")
      .exec();
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete Order (ADMIN)
exports.deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  validateMongodbId(id);
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    res.json({ message: "Order Deleted Successfully", deletedOrder });
  } catch (error) {
    throw new Error(error);
  }
});

// //get user order by id (ADMIN)
// exports.getOrderByUserId = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbId(id);
//   try {
//     const userorders = await Order.findOne({ orderBy: id })
//       .populate("products.product")
//       .populate("orderBy")
//       .exec();
//     console.log(userorders);
//     res.json(userorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// //update Order Status
// exports.updateOrderStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   validateMongodbId(id);
//   try {
//     const updateOrderStatus = await Order.findByIdAndUpdate(
//       id,
//       {
//         orderStatus: status,
//         paymentIntent: {
//           status: status,
//         },
//       },
//       { new: true }
//     );
//     res.json(updateOrderStatus);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//Order
