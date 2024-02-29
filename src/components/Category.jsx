import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/Category.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/categories/categorySlice";
import { getTasks } from "../features/tasks/taskSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { toast } from "react-toastify";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

const Category = () => {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addTaskWindow, setAddTaskWindow] = useState(true);
  const [options, setOptions] = useState(false);
  const [formData, setFormData] = useState({
    task_name: "",
    task_details: "",
    priority: 0,
  });

  const [optionPosition, setOptionPosition] = useState({
    x: 0,
    y: 0,
  });

  const [editMenu, setEditMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);

  const [taskData, setTaskData] = useState({
    id: null,
    category_name: "",
    category_details: "",
  });

  const { task_name, task_details, priority } = formData;

  const { category } = useSelector((state) => state.categories);

  const { category_name, category_details, created_at } = category;

  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCategory(category_id));
        await dispatch(getTasks());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, category_id]);

  const handleAddWindow = (e) => {
    e.preventDefault();
    setAddTaskWindow((prevState) => !prevState);
    setOptions(false);
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    setOptionPosition({ x: e.clientX, y: e.clientY });
    setTaskData(data);
    setOptions(true);
  };

  const handleClose = () => {
    setOptions(false);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!category_name.trim() || !category_details.trim()) {
      toast.error("All fields are required.");
      return;
    }

    setFormData({
      category_name: "",
      category_details: "",
    });

    setAddTaskWindow((prevState) => !prevState);
  };

  const handleScroll = () => {
    setOptions(false);
    setAddTaskWindow(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "#ff7575";
      case "medium":
        return "#ffa34f";
      case "low":
        return "#43b97f";
      default:
        return "transparent";
    }
  };

  return (
    <div>
      {addTaskWindow && (
        <div className="AddCContainer" onContextMenu={handleAddWindow}>
          <form className="AddCForm RForm" onSubmit={handleAddTask}>
            <p className="AddCTitle">Add a Task</p>
            <div className="AddCFormGroup">
              <label>Task Name</label>
              <br />
              <input
                className="AddCTexto"
                type="text"
                name="task_name"
                placeholder="Enter task name"
                value={task_name}
                onChange={onChange}
              />
            </div>

            <div className="AddCFormGroup">
              <label>Task Details</label>
              <br />
              <textarea
                className="AddCTextArea"
                name="task_details"
                placeholder="Enter task details"
                value={task_details}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="AddCFormGroup">
              <label>Priority</label>
              <br />
              <select name="priority" value={priority} onChange={onChange}>
                <option value={0}>Low</option>
                <option value={1}>Medium</option>
                <option value={2}>High</option>
              </select>
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
            <Link to={`/categories/${taskData.id}`} className="OButtons">
              View
            </Link>
          </div>
        </div>
      )}

      <div className="SContainer">
        <div className="SCategory">
          <button className="SBack" onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon />
          </button>
          <div className="SBlock">
            <p className="STitle">{category_name} </p>

            <p className="SId">Category ID: {category_id}</p>
            <p className="SDetails">{category_details}</p>
            <p className="SDate">{new Date(created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="Ttop">
          <div className="AMTtitle Ttitle">Tasks related to this category</div>
          <div className="CFlex">
            <div className="CLi middleClass TSheight" onClick={handleAddWindow}>
              <AddRoundedIcon className="midCic" fontSize="large" />
              <p>Add a task</p>
            </div>
            {tasks &&
              tasks.map((task) => (
                <div
                  className="TCLi"
                  key={task.id}
                  onContextMenu={(e) => handleContextMenu(e, task)}
                  onClick={handleClose}
                >
                  <div className="Tstatus">
                    <p
                      className="TaskStat"
                      style={{
                        backgroundColor: getPriorityColor(task.priority),
                      }}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </p>
                    <MoreHorizRoundedIcon className="TaskMainIcs" />
                  </div>
                  <Link to={`/categories/${category.id}/tasks/${task.id}`}>
                    <div className="TShead">
                      <p className="TStitle">
                        {(task.task_name ?? "").length > 30
                          ? `${task.task_name.slice(0, 30)}...`
                          : task.task_name}
                      </p>
                      <p className="TSdetails">
                        {(task.task_details ?? "").length > 40
                          ? `${task.task_details.slice(0, 40)}...`
                          : task.task_details}
                      </p>
                    </div>
                  </Link>
                  <p className="TaskMainDate">
                    {" "}
                    {new Date(category.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
