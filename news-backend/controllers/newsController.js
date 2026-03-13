const Article = require("../models/Article");
const redisClient = require("../config/redis");





exports.getNews = async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishedAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getNewsByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();

    const cacheKey = `news_${category}`;

    // 1️⃣ Check Redis cache
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log("⚡ Category served from Redis");
      return res.json(JSON.parse(cached));
    }

    console.log("📦 Category fetched from MongoDB");

    // 2️⃣ Fetch from MongoDB
    const articles = await Article.find({
    category: { $regex: new RegExp(`^${category}$`, "i") }
    }).sort({ publishedAt: -1 });

    // 3️⃣ Save to Redis (demo: 30 seconds)
    await redisClient.set(cacheKey, JSON.stringify(articles), {
      EX: 30
    });

    res.json(articles);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.incrementView = async (req, res) => {
  const { id } = req.params;

  // Increase trending score
  await redisClient.zIncrBy("trending", 1, id);

  // Increase view count
  await redisClient.incr(`article:${id}:views`);

  res.json({ message: "View counted" });
};

exports.getTrending = async (req, res) => {
  const ids = await redisClient.zRange("trending", 0, 4, {
    REV: true,
  });

  const articles = await Article.find({ _id: { $in: ids } });

  res.json(articles);
};

exports.createArticle = async (req, res) => {
  try {

    const articleData = {
      ...req.body,
    };

    if (req.file) {
      articleData.imageUrl = `http://localhost:5000/images/${req.file.filename}`;
    }

    const article = await Article.create(articleData);

    // Clear Redis caches
    await redisClient.del("news_all");

    const category = article.category?.toLowerCase();
    await redisClient.del(`news_${category}`);

    res.status(201).json(article);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};