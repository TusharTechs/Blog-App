import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserLoginForm from "./components/UserLoginForm";
import UserRegistrationForm from "./components/UserRegistrationForm";
import BlogCreationForm from "./components/BlogCreationForm";
import BlogList from "./components/BlogList";
import UserProfile from "./components/UserProfile";
import WelcomeMessage from "./components/WelcomeMessage";
import SingleBlog from "./components/SingleBlog";
import { jwtDecode } from "jwt-decode";
import UpdateBlog from "./components/UpdateBlog";
import NotFound from "./components/NotFound";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("blogToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.user.id);
    } else {
      setUserId(null);
    }
  }, []);

  return (
    <Router>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/create-blog" className="nav-link">
              Create Blog
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="nav-link">
              Blog List
            </Link>
          </li>
          <li>
            <Link to={`/profile/${userId}`} className="nav-link">
              My Profile
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<WelcomeMessage />} />
          <Route path="/login" element={<UserLoginForm />} />
          <Route path="/register" element={<UserRegistrationForm />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="blogs" element={<BlogList />} />
            <Route path="profile/:id" element={<UserProfile />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="create-blog" element={<BlogCreationForm />} />
            <Route path="update/:id" element={<UpdateBlog />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
