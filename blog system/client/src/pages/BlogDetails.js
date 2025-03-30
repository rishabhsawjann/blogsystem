import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/blogdetails.css";

const API_URL = "https://dev.to/api/articles";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => console.error("Error fetching blog details:", error));
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  if (!blog) return <p className="blog-loading">Loading...</p>;

  return (
    <div className="blog-details-container">
      <h1 className="blog-details-title">{blog.title}</h1>
      <img src={blog.social_image} alt={blog.title} className="blog-details-image" />
      <div
        className="blog-details-content"
        dangerouslySetInnerHTML={{ __html: blog.body_html }}
      ></div>

      <div className="blog-interactions">
        {user ? (
          <button className="like-button" onClick={handleLike}>
            ❤️ Like ({likes})
          </button>
        ) : (
          <p>Please <Link to="/">login</Link> to like this post.</p>
        )}
      </div>

      <div className="blog-comments">
        <h3>Comments</h3>
        <ul>
          {comments.map((c, index) => (
            <li key={index} className="comment">{c}</li>
          ))}
        </ul>

        {user ? (
          <>
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment} className="comment-button">Add Comment</button>
          </>
        ) : (
          <p>Please <Link to="/">login</Link> to comment.</p>
        )}
      </div>


      <Link to="/blogs" className="blog-back-link">← Back to Blogs</Link>
    </div>
  );
};

export default BlogDetails;
