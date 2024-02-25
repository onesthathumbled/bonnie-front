import React from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category_id } = useParams();
  return (
    <div>
      <h2>SubCategory Component</h2>
      <p>Category ID: {category_id}</p>
    </div>
  );
};

export default Category;
