import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const user = null;

  return (
    <nav className="main-nav">
      {" "}
      <h2 style={{ padding: "0 1rem", marginRight: "auto" }}>Yellow Class</h2>
      <Link to="/" className="nav-item nav-btn about">
        About
      </Link>
      <Link to="/" className="nav-item nav-btn products">
        Products
      </Link>
      <Link to="/" className="nav-item nav-btn forTeams">
        ForTeams
      </Link>
      {user === null ? (
        <Link to="/" className="nav-item nav-links">
          Log in
        </Link>
      ) : (
        <button className="nav-item nav-links" onClick={handleLogOut}>
          Log out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
