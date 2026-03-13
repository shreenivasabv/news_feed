import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "International",
    source: "",
  });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchArticles = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/articles", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    await axios.post("http://localhost:5000/api/admin/articles", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchArticles();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/admin/articles/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchArticles();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Panel</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={(e) => setForm({...form, title: e.target.value})} />
        <textarea placeholder="Description" onChange={(e) => setForm({...form, description: e.target.value})} />
        
        <select onChange={(e) => setForm({...form, category: e.target.value})}>
          <option>International</option>
          <option>Sports</option>
          <option>Cinema</option>
          <option>Technology</option>
          <option>Business</option>
          <option>Politics</option>
        </select>

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Add Article</button>
      </form>

      <hr />

      {articles.map((a) => (
        <div key={a._id}>
          <h4>{a.title}</h4>
          <button onClick={() => handleDelete(a._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;