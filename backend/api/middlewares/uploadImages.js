const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/images/"));
//   },
//   filename: function (req, file, cb) {
//     const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
//   },
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniquesuffix + ext);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    // cb({ message: "Unsupported file format" }, false);
    cb(new Error("Unsupported file format"), false);
  }
};

exports.uploadImage = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

exports.categoryImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req?.files?.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/category/${file.filename}`);
      fs.unlinkSync(`public/images/category/${file.filename}`);
    })
  );
  next();
};

exports.productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  try {
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/products/${file.filename}`);
        fs.unlinkSync(`public/images/products/${file.filename}`);
      })
    );
  } catch (error) {
    console.log(error);
  }
  next();
};
