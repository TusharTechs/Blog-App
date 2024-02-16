import React, { useState } from "react";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import "../App.css";

const UserRegistrationForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      setUserData({
        ...userData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("profilePicture", userData.profilePicture);

      await axios.post("http://localhost:5000/api/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUserData({
        username: "",
        email: "",
        password: "",
        profilePicture: null,
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-form-container">
      <div className="registration-form">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FaUser /> Username:
            </label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <FaEnvelope /> Email:
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <FaLock /> Password:
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <FaCamera /> Profile Picture:
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
          <button type="submit" disabled={loading} className="register-button">
            {loading ? <Spinner animation="border" size="sm" /> : "Register"}
          </button>
          {success && (
            <Alert variant="success">User registered successfully!</Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
