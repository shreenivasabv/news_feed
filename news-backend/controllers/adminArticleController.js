const Article = require("../models/Article");
const redisClient = require("../config/redis");

exports.createArticle = async (req, res) => {
  const { title, description, category, source } = req.body;

  const article = await Article.create({
    title,
    description,
    category,
    source,
    imageUrl: req.file ? `/images/${req.file.filename}` : "",
  });

  await redisClient.del("news_all");

  res.status(201).json(article);
};

exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);

  await redisClient.del("homepage_news");

  res.json({ message: "Deleted successfully" });
};

exports.getAllArticles = async (req, res) => {
  const articles = await Article.find().sort({ publishedAt: -1 });
  res.json(articles);
};