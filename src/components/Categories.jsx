import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Categories.css";
import {
  createCategory,
  getCategories,
  editCategory,
  deleteCategory,
} from "../features/categories/categorySlice";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { toast } from "react-toastify";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

const Categories = () => {
  const dispatch = useDispatch();

  const { categories, isError, message } = useSelector(
    (state) => state.categories
  );
  const [addCategoryWindow, setAddCategoryWindow] = useState(false);
  const [options, setOptions] = useState(false);
  const [optionPosition, setOptionPosition] = useState({
    x: 0,
    y: 0,
  });
  const [editMenu, setEditMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [categoryData, setCategoryData] = useState({
    id: null,
    category_name: "",
    category_details: "",
  });

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

  const onChangeEdit = (e) => {
    setCategoryData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddWindow = (e) => {
    e.preventDefault();
    setAddCategoryWindow((prevState) => !prevState);
    setOptions(false);
  };

  const handleEditWindow = (e) => {
    e.preventDefault();
    setEditMenu(false);
    setOptions(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    window.addEventListener("scroll", handleScroll);

    dispatch(getCategories());

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, isError, message]);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!category_name.trim() || !category_details.trim()) {
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

  const handleEditCategory = async (e) => {
    e.preventDefault();

    if (!categoryData.category_name || !categoryData.category_details) {
      toast.error("All fields are required.");
    }

    await dispatch(editCategory({ id: categoryData.id, categoryData }));

    dispatch(getCategories());

    setCategoryData({
      id: null,
      category_name: "",
      category_details: "",
    });

    setEditMenu(false);
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();

    await dispatch(deleteCategory(categoryData.id));

    dispatch(getCategories());

    setCategoryData({
      id: null,
      category_name: "",
      category_details: "",
    });

    setDeleteMenu(false);
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    setOptionPosition({ x: e.clientX, y: e.clientY });
    setCategoryData(data);
    setOptions(true);
  };

  const handleClose = () => {
    setOptions(false);
  };

  const handleScroll = () => {
    setOptions(false);
    setAddCategoryWindow(false);
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

      {options && (
        <div
          className="OBlock"
          style={{
            left: optionPosition.x,
            top: optionPosition.y,
          }}
        >
          <div
            onClick={() => {
              setEditMenu(true);
              setOptions(false);
            }}
          >
            <EditRoundedIcon className="OIc" />
            <p className="OButtons">Edit</p>
          </div>

          <div
            onClick={() => {
              setDeleteMenu(true);
              setOptions(false);
            }}
          >
            <DeleteRoundedIcon className="OIc" />
            <p className="OButtons">Delete</p>
          </div>

          <div>
            <RemoveRedEyeRoundedIcon className="OIc" />
            <p className="OButtons">View</p>
          </div>
        </div>
      )}

      {editMenu && (
        <div className="AddCContainer" onContextMenu={handleEditWindow}>
          <form className="AddCForm RForm" onSubmit={handleEditCategory}>
            <p className="AddCTitle">Edit Category</p>
            <div className="AddCFormGroup">
              <label>Category Name</label>
              <br />
              <input
                className="AddCTexto"
                type="text"
                name="category_name"
                placeholder="Edit category name"
                value={categoryData.category_name}
                onChange={onChangeEdit}
              />
            </div>

            <div className="AddCFormGroup">
              <label>Category Details</label>
              <br />
              <textarea
                className="AddCTextArea"
                name="category_details"
                placeholder="Edit category details"
                value={categoryData.category_details}
                onChange={onChangeEdit}
              ></textarea>
            </div>

            <div className="AddCButtons">
              <button onClick={handleEditWindow} className="AddCcancel">
                Cancel
              </button>
              <button type="submit">Edit</button>
            </div>
          </form>
        </div>
      )}

      {deleteMenu && (
        <div
          className="DContainer"
          onContextMenu={(e) => {
            e.preventDefault();
            setDeleteMenu(false);
          }}
        >
          <p className="CTi">Are you sure you want to delete this category?</p>
          <div className="DButtons">
            <button className="DGreen" onClick={() => setDeleteMenu(false)}>
              Cancel
            </button>
            <button className="DRed" onClick={handleDeleteCategory}>
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="Categories">
        <div className="AMTtitle">Categories</div>
        <div className="CFlex">
          <div className="CLi middleClass" onClick={handleAddWindow}>
            <AddRoundedIcon className="midCic" fontSize="large" />
            <p>Add a category</p>
          </div>
          {categories &&
            categories.map((category) => (
              <div
                className="CLi"
                key={category.id}
                onContextMenu={(e) => handleContextMenu(e, category)}
                onClick={handleClose}
              >
                <Link to={`/categories/${category.id}`}>
                  <div className="Ccat">
                    <p className="TaskMainTitle CTi">
                      {category.category_name}
                    </p>
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
