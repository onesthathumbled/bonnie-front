import React, { useEffect } from "react";
import Navbar from "./Navbar";
import LeftBar from "./LeftBar";
import Feed from "./Feed";
import RightBar from "./RightBar";
import { Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import Category from "./Category";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("authToken");

  const checkTokenExpiration = () => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  useEffect(() => {
    const tokenExpired = checkTokenExpiration();

    if (tokenExpired || !user) {
      navigate("/login");
    }

    const expirationCheckInterval = setInterval(() => {
      const tokenExpired = checkTokenExpiration();

      if (tokenExpired || !user) {
        navigate("/login");
      }
    }, 60000);

    return () => clearInterval(expirationCheckInterval);
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <LeftBar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category_id" element={<Category />} />
      </Routes>
      <RightBar />
    </div>
  );
};

export default Dashboard;
