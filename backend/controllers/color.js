const Color = require("../models/color");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");

exports.createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    // res.json(newColor);
    res.json({message:"Color Added Successfully!",newColor:newColor})

  } catch (error) {
    throw new Error(error);
  }
});
exports.updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (error) {
    throw new Error(error);
  }
});
exports.deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    // res.json(deletedColor);
    res.json({message:"Color Deleted Successfully!",deletedColor})
    
  } catch (error) {
    throw new Error(error);
  }
});
exports.getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaColor = await Color.findById(id);
    res.json(getaColor);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getallColor = asyncHandler(async (req, res) => {
  try {
    const getallColor = await Color.find();
    res.json(getallColor);
  } catch (error) {
    throw new Error(error);
  }
});
