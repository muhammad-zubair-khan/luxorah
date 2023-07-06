const Coupon = require("../models/discountCoupon");
const { validateMongodbId } = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");

exports.createCoupon = asyncHandler(async (req, res) => {
  try {
    if (!req.body.couponName) {
      throw new Error('Coupon name is required.');
    }
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});


exports.getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "Coupon Updated Successfully",
      updatecoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Coupon deleted Successfully",
      deletecoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});
exports.getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getAcoupon = await Coupon.findById(id);
    res.json(getAcoupon);
  } catch (error) {
    throw new Error(error);
  }
});
