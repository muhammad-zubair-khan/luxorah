const fs = require("fs");
const asyncHandler = require("express-async-handler");
const {
  UploadImageOnCloudinary,
  DeleteImageOnCloudinary,
} = require("../utils/cloudinary");

// exports.uploadImages = asyncHandler(async (req, res) => {
//   try {
//     const uploader = (path) => UploadImageOnCloudinary(path, "images");
//     const urls = [];
//     const files = req.files;
//     for (const file of files) {
//       const { path } = file;
//       const newpath = await uploader(path);
//       console.log(newpath);
//       urls.push(newpath);
//       fs.unlinkSync(path);
//     }
//     const images = urls.map((file) => {
//       return file;
//     });
//     res.json({ message: "Image Upload Successfully", images: images });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

exports.uploadImages = asyncHandler(async (req, res) => {
  try {
    if (!req.files) {
      res.status(400).json({ message: "No files were uploaded" });
      return;
    }

    const uploader = (path) => UploadImageOnCloudinary(path, "images");
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path, size } = file;

      // Check if file size exceeds the limit
      if (size > 2 * 1024 * 1024) {
        res.status(400).json({ message: "File too large" });
        return;
      }

      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }

    const images = urls.map((file) => {
      return file;
    });

    res.json({ message: "Image Upload Successfully", images: images });
  } catch (error) {
    throw new Error(error);
  }
});

//For Categoty
exports.uploadCategoryImage = asyncHandler(async (req, res) => {
  try {
    if (!req.files) {
      res.status(400).json({ message: "No files were uploaded" });
      return;
    }

    const uploader = (path) => UploadImageOnCloudinary(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path, size } = file;

      // Check if file size exceeds the limit
      if (size > 2 * 1024 * 1024) {
        res.status(400).json({ message: "File too large" });
        return;
      }

      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls?.map((file) => {
      return file;
    });
    // res.json(images);
    res.json({ message: "Image Upload Successfully", images: images });
  } catch (error) {
    throw new Error(error);
  }
});

exports.deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = DeleteImageOnCloudinary(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});
