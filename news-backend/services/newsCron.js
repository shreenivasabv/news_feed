const cron = require("node-cron");
const axios = require("axios");
const Article = require("../models/Article");
const categorizeNews = require("../utils/categorizeNews");

cron.schedule("*/1 * * * *", async () => {
  try {

    console.log("📰 Fetching latest news...");

    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country: "us",
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    console.log("Articles received:", response.data.articles.length);

    for (let item of response.data.articles) {

      if (!item.title) continue;

      // avoid duplicates
      const exists = await Article.findOne({ title: item.title });

      if (!exists) {
        await Article.create({
          title: item.title||"No title available",
          description: item.description||"No description available",
          imageUrl: item.urlToImage,
          source: item.source?.name || "Unknown",
          category:  categorizeNews(item.title, item.description),
          publishedAt: item.publishedAt
        });
      }
    }

    console.log("✅ News updated");

  } catch (error) {
    console.log("❌ News fetch failed:", error.message);
  }
});