import React, { useState } from "react";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../App.css";

const UserLoginForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://blog-app-three-flax.vercel.app/api/users/login",
        userData
      );
      const { token } = response.data;
      localStorage.setItem("blogToken", token);
      setSuccess(true);
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="registration-form">
        <h2>User Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading} className="register-button">
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </button>
          {success && <Alert variant="success">User Login successful!</Alert>}
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
