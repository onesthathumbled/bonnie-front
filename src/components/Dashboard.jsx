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

const Dashboard = () => {
  const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    // Add more categories as needed
  ];

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <LeftBar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route
          path="/categories"
          element={<Categories categories={categories} />}
        />
        <Route path="/categories/:category_id" element={<Category />} />
      </Routes>
      <RightBar />
    </div>
  );
};

export default Dashboard;
