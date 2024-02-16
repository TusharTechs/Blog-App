import React, { useState } from "react";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";
import "../App.css";

const BlogCreationForm = () => {
  const [blogData, setBlogData] = useState({
    image: null,
    heading: "",
    body: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setBlogData({
      ...blogData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("blogToken");
      const formData = new FormData();
      formData.append("heading", blogData.heading);
      formData.append("body", blogData.body);
      formData.append("author", blogData.author);
      formData.append("image", blogData.image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post("https://blog-app-three-flax.vercel.app/api/blogs", formData, config);
      setBlogData({
        heading: "",
        body: "",
        author: "",
        image: null,
      });
      setAlertVariant("success");
      setAlertMessage("Blog created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
      setAlertVariant("danger");
      setAlertMessage("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-form">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Heading:</label>
          <input
            type="text"
            name="heading"
            value={blogData.heading}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            name="body"
            value={blogData.body}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            style={{ marginBottom: "20px" }}
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Create Blog"
          )}
        </button>
        {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
      </form>
    </div>
  );
};

export default BlogCreationForm;
