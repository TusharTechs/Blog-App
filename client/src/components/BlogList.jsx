import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const truncate = (str, maxWords) => {
  const words = str.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return str;
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const blogToken = localStorage.getItem("blogToken");
      const response = await axios.delete(
        `http://localhost:5000/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${blogToken}`,
          },
        }
      );
      if (response.status === 200) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        console.log("Blog deleted successfully.");
      } else {
        console.error("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="blog-list-container">
      <h2>Blog List</h2>
      <div className="blog-list">
        {blogs.map((blog, index) => (
          <div key={blog._id} className="blog-item">
            <Link to={`/blog/${blog._id}`} className="blog-item-link">
              <img src={blog.image} alt="" className="blog-image" />
              <div className="blog-details">
                <h3>{blog.heading}</h3>
                <p>{truncate(blog.body, 20)}</p>
              </div>
            </Link>
            <div className="blog-actions">
              <Link to={`/update/${blog._id}`} className="blog-item-link">
                <FaEdit className="edit-icon" />
              </Link>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(blog._id);
                }}
              >
                <FaTrash className="delete-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
