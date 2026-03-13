import API from "../services/api";

// fallback images
import internationalImg from "../assets/fallback/international.png";
import sportsImg from "../assets/fallback/sports.png";
import cinemaImg from "../assets/fallback/cinema.png";
import technologyImg from "../assets/fallback/technology.png";
import businessImg from "../assets/fallback/business.png";
import politicsImg from "../assets/fallback/politics.png";

function NewsCard({ article }) {
  const handleClick = async () => {
    await API.post(`/news/view/${article._id}`);
  };

  const fallbackImages = {
    international: internationalImg,
    sports: sportsImg,
    cinema: cinemaImg,
    technology: technologyImg,
    business: businessImg,
    politics: politicsImg,
  };

  const imageSrc = article.imageUrl
    ? `http://localhost:5000${article.imageUrl}`
    : fallbackImages[article.category?.toLowerCase()];

  return (
    <div className="news-card" onClick={handleClick}>
      <img
        src={imageSrc}
        alt={article.title}
        className="news-card-image"
        onError={(e) => {
          e.target.src =
            fallbackImages[article.category?.toLowerCase()];
        }}
      />

      <div className="news-card-content">
        <h3>{article.title}</h3>
        <p>{article.description?.substring(0, 80)}...</p>
      </div>
    </div>
  );
}

export default NewsCard;