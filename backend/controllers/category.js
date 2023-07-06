const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");
const slugify = require("slugify");

exports.createCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newCategory = await Category.create(req.body);
    res.json({
      success: true,
      message: "Category is created successfully",
      newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "Catgory Updated Successfully",
      updatedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.getCatgories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const category = await Category.findById(id);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getCategoryByType = asyncHandler(async (req, res) => {
  const { type } = req.params;
  // console.log("params",type)
  try {
    const categories = await Category.find({ type });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

exports.deleteCaegory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Category deleted Successfully",
      category,
    });
  } catch (error) {
    throw new Error(error);
  }
});
