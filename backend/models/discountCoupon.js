const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const couponSchema = new mongoose.Schema({
  couponName: {
    type: String,
    required: true,
    unique: true,
  },
  expiryStart: {
    type: String,
    required: true,
  },
  expiryEnd: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Coupon", couponSchema);
