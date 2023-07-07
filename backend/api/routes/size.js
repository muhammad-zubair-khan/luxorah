const express = require("express");
const {
  createSize,
  updateSize,
  deleteSize,
  getSize,
  getallSize,
} = require("../controllers/size");
const {
  authMiddleware,
  isAdmin,
} = require("../middlewares/forAdminPanel/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createSize);
router.put("/:id", authMiddleware, isAdmin, updateSize);
router.delete("/:id", authMiddleware, isAdmin, deleteSize);
router.get("/:id", getSize);
router.get("/", getallSize);

module.exports = router;