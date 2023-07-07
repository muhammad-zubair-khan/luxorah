const express = require("express");
const {
  createCategory,
  getCatgories,
  getCategory,
  updateCategory,
  deleteCaegory,
  getCategoryByType,
} = require("../controllers/category");
// const { authMiddleware ,isAdmin} = require("../middlewares/authMiddleware");
const {
  authMiddleware,
  isAdmin,
} = require("../middlewares/forAdminPanel/authMiddleware");
const router = express.Router();

router.post("/add", authMiddleware, isAdmin, createCategory);
router.get("/", getCatgories);
router.get("/:id", getCategory);
router.get("/categories/:type", getCategoryByType);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCaegory);

module.exports = router;
