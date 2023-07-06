const mongoose = require("mongoose"); 

// Declare the Schema of the Mongo model
var enqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    default: "Submitted",
    enum: ["Submitted", "Contacted", "In Progress", "Resolved"],
  },
},{timestamps:true});

//Export the model
module.exports = mongoose.model("Enquiry", enqSchema);