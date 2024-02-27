import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Categories.css";
import {
  createCategory,
  getCategories,
} from "../features/categories/categorySlice";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { toast } from "react-toastify";

const Categories = () => {
  const dispatch = useDispatch();

  const { categories, isError, message } = useSelector(
    (state) => state.categories
  );
  const [addCategoryWindow, setAddCategoryWindow] = useState(false);

  const [formData, setFormData] = useState({
    category_name: "",
    category_details: "",
  });

  const { category_name, category_details } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddWindow = (e) => {
    e.preventDefault();
    setAddCategoryWindow((prevState) => !prevState);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCategories());
  }, [dispatch, isError, message]);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!category_name || !category_details) {
      toast.error("All fields are required.");
      return;
    }

    await dispatch(createCategory(formData));

    dispatch(getCategories());

    setFormData({
      category_name: "",
      category_details: "",
    });

    setAddCategoryWindow((prevState) => !prevState);
  };

  return (
    <div>
      {addCategoryWindow && (
        <div className="AddCContainer" onContextMenu={handleAddWindow}>
          <form className="AddCForm RForm" onSubmit={handleAddCategory}>
            <p className="AddCTitle">Add a Category</p>
            <div className="AddCFormGroup">
              <label>Category Name</label>
              <br />
              <input
                className="AddCTexto"
                type="text"
                name="category_name"
                placeholder="Enter category name"
                value={category_name}
                onChange={onChange}
              />
            </div>

            <div className="AddCFormGroup">
              <label>Category Details</label>
              <br />
              <textarea
                className="AddCTextArea"
                name="category_details"
                placeholder="Enter category details"
                value={category_details}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="AddCButtons">
              <button onClick={handleAddWindow} className="AddCcancel">
                Cancel
              </button>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      )}

      <div className="Categories">
        <p className="AMTtitle">Categories</p>
        <ul className="CFlex">
          <li className="CLi middleClass" onClick={handleAddWindow}>
            <AddRoundedIcon className="midCic" fontSize="large" />
            <p>Add a category</p>
          </li>
          {categories.map((category) => (
            <li className="CLi" key={category.id}>
              <Link to={`/categories/${category.id}`}>
                <div className="Ccat">
                  <p className="TaskMainTitle CTi">{category.category_name}</p>
                  <MoreHorizRoundedIcon className="TaskMainIcs" />
                </div>
                <p className="TaskMainSub">
                  {(category.category_details ?? "").length > 100
                    ? `${category.category_details.slice(0, 100)}...`
                    : category.category_details}
                </p>
              </Link>
              <p className="TaskMainDate Cdate">
                {new Date(category.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
