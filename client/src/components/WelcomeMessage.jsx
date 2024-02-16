import React from "react";
import Image from "../assets/landing-page.jpg"
import "../App.css";

const WelcomeMessage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Blog App!</h1>
        <p>
          Explore a world of insightful blogs on various topics written by
          passionate authors.
        </p>
        <img
          src={Image}
          alt="Blog App"
          className="landing-image"
        />
      </div>
    </div>
  );
};

export default WelcomeMessage;
