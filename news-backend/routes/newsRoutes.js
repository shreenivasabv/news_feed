const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getNews,
  incrementView,
  getTrending,
  createArticle,
  getNewsByCategory
} = require("../controllers/newsController");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/*
Routes
*/

// Get all news
router.get("/", getNews);

// Get news by category (Redis cached)
router.get("/category/:category", getNewsByCategory);

// Trending news
router.get("/trending", getTrending);

// Increment views
router.post("/view/:id", incrementView);

// Create article
router.post("/", upload.single("image"), createArticle);

module.exports = router;