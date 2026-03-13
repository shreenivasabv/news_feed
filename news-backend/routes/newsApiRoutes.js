
const express = require("express");
const router = express.Router();


const { fetchExternalNews } = require("../controllers/newsApiController");

router.get("/fetch-news", fetchExternalNews);
module.exports = router;