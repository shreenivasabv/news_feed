import { useEffect, useState } from "react";
import API from "../services/api";

function Trending() {
  const [articles, setArticles] = useState([]);
  // Local fallback image path (located in your frontend/public/folder)
  const fallbackImage = "/images/cricket.jpeg";

  useEffect(() => {
    API.get("/news/trending")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.error("Backend unreachable, loading empty state or local cache", err);
        // Optional: Load a hardcoded 'static' list if backend fails
      });
  }, []);

  return (
    <div className="trending">
      <h3>Trending 🔥</h3>
      {articles.map((a) => (
        <div key={a._id} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <img 
            // Try to load the backend URL first
            src={a.imageUrl} 
            alt={a.title}
            style={{ width: "50px", height: "50px", borderRadius: "4px" }}
            // FALLBACK: If the backend image link is broken, use frontend local image
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = fallbackImage;
            }}
          />
          <p>{a.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Trending;