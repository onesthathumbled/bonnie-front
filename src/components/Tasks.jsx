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
import { getAllTasks } from "../features/tasks/taskSlice";

const Tasks = () => {
  const dispatch = useDispatch();

  const { all_tasks, isError, message } = useSelector((state) => state.tasks);
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

  const sortedTasks = [...all_tasks].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

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

    dispatch(getAllTasks());

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

  const getPriorityColor = (priority) => {
    if (typeof priority === "string") {
      switch (priority.toLowerCase()?.charAt(0)) {
        case "h":
          return "#ff7575"; // High
        case "m":
          return "#ffa34f"; // Medium
        case "l":
          return "#43b97f"; // Low
        default:
          return "transparent";
      }
    } else if (typeof priority === "number") {
      switch (priority) {
        case 2:
          return "#ff7575"; // High
        case 1:
          return "#ffa34f"; // Medium
        case 0:
          return "#43b97f"; // Low
        default:
          return "transparent";
      }
    }

    return "transparent"; // Default color if priority is not a string or number
  };

  return (
    <div>
      {/* {addCategoryWindow && (
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
              <button type="submit" className="AddCplus">
                Add
              </button>
            </div>
          </form>
        </div>
      )} */}

      {/* {options && (
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
            <Link to={`/categories/${categoryData.id}`} className="OButtons">
              View
            </Link>
          </div>
        </div>
      )} */}

      {/* {editMenu && (
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
              <button type="submit" className="AddCplus">
                Edit
              </button>
            </div>
          </form>
        </div>
      )} */}

      {/* {deleteMenu && (
        <div
          className="DContainer"
          onContextMenu={(e) => {
            e.preventDefault();
            setDeleteMenu(false);
          }}
        >
          <p className="CTi">Are you sure you want to delete this category?</p>
          <div className="DButtons">
            <button className="AddCplus" onClick={() => setDeleteMenu(false)}>
              Cancel
            </button>
            <button className="AddCcancel" onClick={handleDeleteCategory}>
              Delete
            </button>
          </div>
        </div>
      )} */}

      <div className="Categories">
        <div className="AMTtitle">Tasks</div>
        <div className="CFlex">
          {all_tasks < 1 && (
            <Link to={"/categories"}>
              <div className="CLi middleClass" onClick={handleAddWindow}>
                <p>There's nothing here.</p>
                {/* <AddRoundedIcon className="midCic" fontSize="large" /> */}
                {/* <p>Add a category first.</p> */}
              </div>
            </Link>
          )}
          {all_tasks &&
            sortedTasks.map((task) => (
              <div
                className="TCLi Whiter"
                key={task.id}
                onContextMenu={(e) => handleContextMenu(e, task)}
                onClick={handleClose}
                // style={{
                //   backgroundColor:
                //     task.completion_status === "completed"
                //       ? "#c280d2"
                //       : "#1f2029",
                // }}
              >
                <div className="Tstatus">
                  <p
                    className="TaskStat"
                    style={{
                      backgroundColor: getPriorityColor(task?.priority),
                    }}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </p>
                  <MoreHorizRoundedIcon className="TaskMainIcs" />
                </div>
                {/* <Link to={`/categories/${category.id}/tasks/${task.id}`}> */}
                <div className="TShead">
                  <p
                    className="TStitle"
                    // style={{
                    //   textDecoration:
                    //     task.completion_status === "completed"
                    //       ? "line-through"
                    //       : task.completion_status === "in_progress"
                    //       ? "underline"
                    //       : "none",
                    // }}
                  >
                    {(task.task_name ?? "").length > 30
                      ? `${task.task_name.slice(0, 30)}...`
                      : task.task_name}
                  </p>
                  <p
                    className="TSdetails"
                    // style={{
                    //   textDecoration:
                    //     task.completion_status === "completed"
                    //       ? "line-through"
                    //       : "none",
                    // }}
                  >
                    {(task.task_details ?? "").length > 40
                      ? `${task.task_details.slice(0, 40)}...`
                      : task.task_details}
                  </p>
                </div>
                {/* </Link> */}
                <div className="CTgory">
                  <p
                    className="CTstatus"
                    style={{
                      color:
                        task.completion_status === "completed"
                          ? "#43b97f"
                          : task.completion_status === "in_progress"
                          ? "#c280d2"
                          : "#ffa34f",
                    }}
                  >
                    {task.completion_status === "backlog"
                      ? "Backlog"
                      : task.completion_status === "in_progress"
                      ? "In Progress"
                      : "Completed"}
                  </p>
                  <p className="TaskMainDate">
                    {" "}
                    {new Date(task.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
