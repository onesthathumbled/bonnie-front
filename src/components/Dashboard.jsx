import React from "react";
import Navbar from "./Navbar";
import LeftBar from "./LeftBar";
import Feed from "./Feed";
import RightBar from "./RightBar";
import { Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import Category from "./Category";

const Dashboard = () => {
  const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    // Add more categories as needed
  ];

  return (
    <div>
      <Navbar />
      <LeftBar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route
          path="/categories/"
          element={<Categories categories={categories} />}
        />
        <Route path="/categories/:category_id" element={<Category />} />
      </Routes>
      <RightBar />
    </div>
  );
};

export default Dashboard;
