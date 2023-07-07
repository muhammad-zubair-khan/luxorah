// const mongoose = require("mongoose");
// // Declare the Schema of the Mongo model
// const authSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   _id: {
//     type: String,
//     required: true,
//   },
//   profilepic: {
//     type: String,
//   },
// },{timestamps:true});

// //Export the model
// module.exports = mongoose.model("Auth", authSchema);

const mongoose = require("mongoose");
const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    picture: {
      type: String,
    },
    googleId: {
      type: String,
    },
    token:{
      type:String
    },
    resetLink:{
      type:String,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Auth", authSchema);
