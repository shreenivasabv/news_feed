import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "International",
    source: "",
  });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/articles",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setArticles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    await axios.post(
      "http://localhost:5000/api/admin/articles",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setForm({
      title: "",
      description: "",
      category: "International",
      source: "",
    });

    setImage(null);

    fetchArticles();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/admin/articles/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchArticles();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#111827",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Admin Panel</h2>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "8px 12px",
            background: "#ef4444",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px", background: "#f4f6f9" }}>
        <h2>Add New Article</h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            required
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          >
            <option>International</option>
            <option>Sports</option>
            <option>Cinema</option>
            <option>Technology</option>
            <option>Business</option>
            <option>Politics</option>
          </select>

          <input
            type="text"
            placeholder="Source"
            value={form.source}
            onChange={(e) =>
              setForm({ ...form, source: e.target.value })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginBottom: "10px" }}
          />

          <button
            type="submit"
            style={{
              padding: "10px 15px",
              background: "#3b82f6",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add Article
          </button>
        </form>

        <h2>All Articles</h2>

        {articles.map((article) => (
          <div
            key={article._id}
            style={{
              background: "white",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{article.title}</span>
            <button
              onClick={() => handleDelete(article._id)}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;