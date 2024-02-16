import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { FiCalendar, FiUser } from "react-icons/fi";
import "../App.css";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog by id:", error);
        setLoading(false);
      }
    };

    fetchBlogById();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!blog) {
    return <div>Error fetching blog. Please try again later.</div>;
  }

  return (
    <div className="single-blog-container">
      <img src={blog.image} alt="" className="blog-image" />
      <div className="blog-details">
        <h2>{blog.heading}</h2>
        <p className="blog-body">{blog.body}</p>
        <div className="author-info">
          <FiUser className="icon" />
          <p>Author: {blog.author.username}</p>
        </div>
        <div className="date-info">
          <FiCalendar className="icon" />
          <p>Posted Date: {new Date(blog.postedDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
