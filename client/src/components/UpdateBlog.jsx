import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [blog, setBlog] = useState({
    heading: "",
    body: ""
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogToken = localStorage.getItem("blogToken");
      if (!blogToken) {
        console.error("User not authenticated.");
        return;
      }

      await axios.put(`http://localhost:5000/api/blogs/${id}`, blog, {
        headers: {
          Authorization: `Bearer ${blogToken}`
        }
      });
      console.log("Blog updated successfully.");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="update-blog-container">
      <h2 className="update-blog-heading">Update Blog</h2>
      <form className="update-blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="heading" className="form-label">Heading:</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={blog.heading}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="body" className="form-label">Body:</label>
          <textarea
            id="body"
            name="body"
            value={blog.body}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
        <button type="submit" className="update-blog-button">Update Blog</button>
      </form>
    </div>
  );
};

export default UpdateBlog;
