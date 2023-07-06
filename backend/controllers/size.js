const Size = require("../models/size");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");

exports.createSize = asyncHandler(async (req, res) => {
  try {
    const newSize = await Size.create(req.body);
    // res.json(newSize);
    res.json({message:"Size Added Successfully!",newSize:newSize})

  } catch (error) {
    throw new Error(error);
  }
});
exports.updateSize = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedSize = await Size.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSize);
  } catch (error) {
    throw new Error(error);
  }
});
exports.deleteSize = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedSize = await Size.findByIdAndDelete(id);
    // res.json(deletedSize);
    res.json({message:"Size Deleted Successfully!",deletedSize})

  } catch (error) {
    throw new Error(error);
  }
});
exports.getSize = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaSize = await Size.findById(id);
    res.json(getaSize);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getallSize = asyncHandler(async (req, res) => {
  try {
    const getallSize = await Size.find();
    res.json(getallSize);
  } catch (error) {
    throw new Error(error);
  }
});
