const axios = require("axios");
const Article = require("../models/Article");

exports.fetchExternalNews = async (req, res) => {
  try {

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines`,
      {
        params: {
          country: "us",
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    const articles = response.data.articles;

    const savedArticles = [];

    for (let item of articles) {

      const article = await Article.create({
        title: item.title,
        description: item.description||"No description available",
        category: item.source.name || "International",
        imageUrl: item.urlToImage,
        source: item.source.name,
        publishedAt: item.publishedAt
      });

      savedArticles.push(article);
    }

    res.json(savedArticles);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};