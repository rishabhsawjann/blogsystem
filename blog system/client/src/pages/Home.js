// Home.js
import React from "react";
import { Link } from "react-router-dom";
import '../css/home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Welcome to the Blog System</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p className="home-subtitle">Explore various blog posts on different topics.</p>
      <Link to="/blogs" className="home-button">
        View Blogs
      </Link>
    </div>
  );
};

export default Home;
