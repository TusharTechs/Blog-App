import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "react-bootstrap";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("blogToken");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`,
          config
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="user-profile-container">
      <h2 className="mb-4">User Profile</h2>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="user-profile-details">
          <div className="user-profile-info">
            <div className="flex-space-between">
              <p className="mb-2">
                <strong>Username:</strong>
              </p>
              <p>{userData.username}</p>
            </div>
            <div className="flex-space-between">
              <p className="mb-2">
                <strong>Email:</strong>
              </p>
              <p>{userData.email}</p>
            </div>
            <div className="profile-picture">
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="mt-2"
                style={{ maxWidth: "300px", borderRadius: "50%" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
