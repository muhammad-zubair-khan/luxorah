const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); //for password reset
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    // cart: {
    //   type: Array,
    //   default: [],
    // },
    // address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    address: {
      type: String,
    },
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: { type: String },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  { timestamps: true }
);
//save the hashPassword before saving schema in MongoDb
userSchema.pre("save", async function (next) {
  //if password is modified/changed
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare the password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Password Reset Token
userSchema.methods.createPassowrdResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 + 60 * 1000; //For 10 Minutes
  return resetToken;
};

//Export the model
module.exports = mongoose.model("User", userSchema);
