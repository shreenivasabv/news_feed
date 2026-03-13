const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const protect = require("../middleware/adminMiddleware");
const {
  createArticle,
  deleteArticle,
  getAllArticles,
} = require("../controllers/adminArticleController");

router.get("/articles", protect, getAllArticles);
router.post("/articles", protect, upload.single("image"), createArticle);
router.delete("/articles/:id", protect, deleteArticle);

module.exports = router;