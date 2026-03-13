import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NewsCard from "../components/NewsCard";
import Trending from "../components/Trending";
import Footer from "../components/Footer";
import "../styles/main.css";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    API.get("/news").then((res) => setArticles(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <div className="container">
        <div className="news-grid">
          {articles.slice(0,6).map((article) => (
            <NewsCard key={article._id} article={article} />
          ))}
        </div>

        <Trending />
      </div>

      <Footer />
    </>
  );
}

export default Home;