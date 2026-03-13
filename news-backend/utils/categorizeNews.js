function categorizeNews(title, description) {
  const text = (title + " " + description).toLowerCase();

  if (text.includes("football") || text.includes("cricket") || text.includes("nba") || text.includes("fifa")) {
    return "Sports";
  }

  if (text.includes("ai") || text.includes("software") || text.includes("technology") || text.includes("google") || text.includes("apple")) {
    return "Technology";
  }

  if (text.includes("stock") || text.includes("market") || text.includes("economy") || text.includes("finance")) {
    return "Business";
  }

  if (text.includes("government") || text.includes("election") || text.includes("minister") || text.includes("policy")) {
    return "Politics";
  }

  if (text.includes("movie") || text.includes("film") || text.includes("actor") || text.includes("hollywood")) {
    return "Cinema";
  }

  return "International";
}

module.exports = categorizeNews;