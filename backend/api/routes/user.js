const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  loginAdmin,
  allUser,
  singleUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  getWishList,
  // saveAddress,
  // userCart,
  // getCart,
  // emptyCart,
  // couponDiscount,
  // createOrder,
  // getOrders,
  // updateOrderStatus,
  // getOrderByUserId,
  // getAllOrders,
  // removeProductFromCart,
  // updateProductQuantityInCart,
  saveSharedOrder,
  googleLogin,
  googleLogout,
  getAllOrders,
  deleteOrder,
} = require("../controllers/user");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { authMiddleware: adminAuthMiddleware, isAdmin: adminIsAdmin } = require("../middlewares/forAdminPanel/authMiddleware");

//Google Login Route
router.post("/googlelogin", googleLogin);
router.get("/googlelogout", googleLogout);
router.get('/getuser', authMiddleware, async (req, res) => {
  try {
    // Retrieve user from the authenticated request
    const user = req.user;

    // Return the user information
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
});


router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/loginadmin", loginAdmin);
router.get("/allusers", allUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", updatePassword);

router.get("/wishlist/", authMiddleware, getWishList);
// router.put("/saveaddress", authMiddleware, saveAddress);

// router.post("/cart", authMiddleware, userCart);
// router.get("/cart/", authMiddleware, getCart);
// router.delete("/cart/:cartItemId", authMiddleware, removeProductFromCart);
// router.delete("/cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityInCart);
// router.delete("/cart/empty/", authMiddleware, emptyCart);

// router.post("/applyCoupon", authMiddleware, couponDiscount);

router.post("/saveOrder", authMiddleware, saveSharedOrder);
router.get("/getorders", getAllOrders);
router.delete("/order/:id", adminAuthMiddleware, adminIsAdmin, deleteOrder);

// router.get("/orders/", authMiddleware, getOrders);

router.get("/:id", authMiddleware, isAdmin, singleUser);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/blockuser/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblockuser/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
