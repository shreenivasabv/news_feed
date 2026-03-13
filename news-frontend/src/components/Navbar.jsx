import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        NewsPortal
      </div>

      <div className="nav-links">
        <span onClick={() => navigate("/category/international")}>
          International
        </span>

        <span onClick={() => navigate("/category/sports")}>
          Sports
        </span>

        <span onClick={() => navigate("/category/cinema")}>
          Cinema
        </span>

        <span onClick={() => navigate("/category/technology")}>
          Technology
        </span>

        <span onClick={() => navigate("/category/business")}>
          Business
        </span>

        <span onClick={() => navigate("/category/politics")}>
          Politics
        </span>
      </div>
    </div>
  );
}

export default Navbar;