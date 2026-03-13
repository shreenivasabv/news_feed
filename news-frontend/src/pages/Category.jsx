import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/category.css";
import API from "../services/api";

import internationalImg from "../assets/fallback/international.png";
import sportsImg from "../assets/fallback/sports.png";
import cinemaImg from "../assets/fallback/cinema.png";
import technologyImg from "../assets/fallback/technology.png";
import businessImg from "../assets/fallback/business.png";
import politicsImg from "../assets/fallback/politics.png";

function Category() {
  const { category } = useParams();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fallbackImages = {
    international: internationalImg,
    sports: sportsImg,
    cinema: cinemaImg,
    technology: technologyImg,
    business: businessImg,
    politics: politicsImg,
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/news/category/${category}`);

        setArticles(res.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  if (loading) return <h2 className="loading">Loading News...</h2>;
  if (error) return <h2 className="error">{error}</h2>;

  return (
    <>
      <Navbar />

      <div className="category-container">
        <h1 className="category-title">
          {category.toUpperCase()} NEWS
        </h1>

        {articles.length === 0 ? (
          <p className="no-news">No news available in this category.</p>
        ) : (
          <div className="category-grid">
            {articles.map((article) => (
              <div key={article._id} className="category-card">

                {/* Always render image */}
                <img
                  src={
                    article.imageUrl
                      ? `http://localhost:5000${article.imageUrl}`
                      : fallbackImages[category.toLowerCase()]
                  }
                  alt={article.title}
                  className="category-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      fallbackImages[category.toLowerCase()] || internationalImg;
                  }}
                />

                <div className="category-content">
                  <h3>{article.title}</h3>

                  <p className="category-description">
                    {article.description?.substring(0, 120)}...
                  </p>

                  <p className="category-source">
                    Source: {article.source}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Category;