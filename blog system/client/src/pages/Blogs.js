// Blogs.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/blogs.css";

const API_URL = "https://dev.to/api/articles?per_page=30";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setBlogs(response.data))
      .catch(error => console.error("Error fetching blogs:", error));
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blogs-container">
      <h1 className="blogs-title">All Blogs</h1>
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="blog-search"
      />
      <div className="blogs-grid">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <Link to={`/blog/${blog.id}`} className="blog-link">
              {blog.title}
            </Link>
            <p className="blog-author">by {blog.user.name}</p>
          </div>
        ))}
      </div>
      <Link to="/home" className="blog-back-link">← Back to Home Page</Link>
    </div>
  );
};

export default Blogs;
