const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    orderBy: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    sharedProduct: {
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: String,
        required: true,
      },
      totalPrice: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      productLink: {
        type: String,
        required: true,
      },
    },
    orderFor: {
      name: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
