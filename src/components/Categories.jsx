import React from "react";
import { Link } from "react-router-dom";
import "../styles/Categories.css";

const Categories = ({ categories }) => {
  return (
    <div className="Categories">
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
