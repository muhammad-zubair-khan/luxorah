const express = require("express");
const { uploadImages, deleteImages, uploadCategoryImage } = require("../controllers/uplaodImages");
const { isAdmin, authMiddleware } = require("../middlewares/forAdminPanel/authMiddleware");
const {
  uploadImage,
  productImgResize,
  categoryImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadImage.array("images", 10),
  productImgResize,
  uploadImages
);

router.post(
  "/add",
  authMiddleware,
  isAdmin,
  uploadImage.array("images", 2),
  categoryImgResize,
  uploadCategoryImage
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
