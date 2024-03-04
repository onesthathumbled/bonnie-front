import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/Category.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/categories/categorySlice";
import {
  createTask,
  getTasks,
  editTask,
  taskCompletion,
  deleteTask,
} from "../features/tasks/taskSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { toast } from "react-toastify";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CalendarComponent from "./CalendarComponent";

const Category = () => {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState(null);

  const [addTaskWindow, setAddTaskWindow] = useState(false);
  const [options, setOptions] = useState(false);
  const [formData, setFormData] = useState({
    task_name: "",
    task_details: "",
    priority: null,
    due_date: null,
  });

  const [optionPosition, setOptionPosition] = useState({
    x: 0,
    y: 0,
  });

  const [editMenu, setEditMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);

  const [taskData, setTaskData] = useState({
    id: null,
    task_name: "",
    task_details: "",
    priority: null,
    due_date: null,
  });

  const { task_name, task_details, priority, due_date } = formData;

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
  }, [dispatch, category_id, taskData]);

  const handleAddWindow = (e) => {
    e.preventDefault();
    setAddTaskWindow((prevState) => !prevState);
    setOptions(false);

    setFormData({
      task_name: "",
      task_details: "",
      priority: 0,
      due_date: null,
    });
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
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "priority" ? parseInt(value, 10) : value,
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!task_name.trim() || !task_details.trim()) {
      toast.error("All fields are required.");
      return;
    }

    const taskData = {
      task_name,
      task_details,
      priority,
      due_date: dueDate,
    };

    await dispatch(createTask(taskData));

    dispatch(getTasks());

    setFormData({
      task_name: "",
      task_details: "",
      priority: 0,
      due_date: null,
    });

    setAddTaskWindow((prevState) => !prevState);
  };

  const handleScroll = () => {
    setOptions(false);
    setAddTaskWindow(false);
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

  const handleEditWindow = (e) => {
    e.preventDefault();
    setEditMenu(false);
    setOptions(false);
  };

  const handleEditTask = async (e) => {
    e.preventDefault();

    if (!taskData.task_name || !taskData.task_details) {
      toast.error("All fields are required.");
    }

    await dispatch(editTask({ task_id: taskData.id, taskData }));

    dispatch(getTasks());

    setTaskData({
      id: null,
      task_name: "",
      task_details: "",
      priority: 0,
    });

    setEditMenu(false);
  };

  const handleTaskCompletion = async (completion_status) => {
    setEditMenu(false);
    setOptions(false);

    await dispatch(taskCompletion({ task_id: taskData.id, completion_status }));

    dispatch(getTasks());

    setTaskData({
      id: null,
      task_name: "",
      task_details: "",
      priority: 0,
    });
  };

  const onChangeEdit = (e) => {
    const { name, value } = e.target;

    setTaskData((prevState) => ({
      ...prevState,
      [name]: name === "priority" ? parseInt(value, 10) : value,
    }));
  };

  // const sortedTasks = tasks
  //   ? tasks
  //       .slice() // Create a shallow copy to avoid mutating the original array
  //       .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by date in descending order
  //   : [];

  // Sort
  // const sortedTasks = tasks
  //   ? tasks
  //       .slice() // Create a shallow copy to avoid mutating the original array
  //       .sort((a, b) => {
  //         // First, sort by completion_status in a specific order
  //         const completionStatusOrder = {
  //           completed: 3,
  //           backlog: 2,
  //           in_progress: 1,
  //         };

  //         const statusComparison =
  //           completionStatusOrder[b.completion_status] -
  //           completionStatusOrder[a.completion_status];

  //         // If completion_status is the same, sort by created_at in descending order
  //         return statusComparison === 0
  //           ? new Date(b.created_at) - new Date(a.created_at)
  //           : statusComparison;
  //       })
  //   : [];

  // Reverse
  const sortedTasks = tasks
    ? tasks
        .slice() // Create a shallow copy to avoid mutating the original array
        .sort((a, b) => {
          // First, sort by completion_status in a specific order
          const completionStatusOrder = {
            in_progress: 3,
            backlog: 2,
            completed: 1,
          };

          const statusComparison =
            completionStatusOrder[b.completion_status] -
            completionStatusOrder[a.completion_status];

          // If completion_status is the same, sort by created_at in descending order
          return statusComparison === 0
            ? new Date(b.created_at) - new Date(a.created_at)
            : statusComparison;
        })
    : [];

  const handleDeleteTask = async (e) => {
    e.preventDefault();

    await dispatch(deleteTask(taskData.id));

    dispatch(getTasks());

    setTaskData({
      id: null,
      task_name: "",
      task_details: "",
      priority,
    });

    setDeleteMenu(false);
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

            <CalendarComponent
              className="SoloCalendar"
              setDueDate={setDueDate}
            />

            <div className="AddCFormGroup">
              <label>Priority</label>
              <br />
              <select
                className="TSpriority"
                name="priority"
                value={priority}
                onChange={onChange}
              >
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
              setEditMenu(false);
              setOptions(false);
            }}
          >
            {/* <EditRoundedIcon className="OIc" /> */}
            {taskData.completion_status === "backlog" ? (
              <DirectionsRunIcon className="OIc" />
            ) : taskData.completion_status === "in_progress" ? (
              <PendingActionsIcon className="OIc" />
            ) : taskData.completion_status === "completed" ? (
              <DirectionsRunIcon className="OIc" />
            ) : null}
            <p
              className="OButtons"
              onClick={() => {
                let status = 0;
                if (taskData.completion_status === "backlog") {
                  status = 1;
                } else if (taskData.completion_status === "in_progress") {
                  status = 0;
                } else if (taskData.completion_status === "completed") {
                  status = 1;
                }

                handleTaskCompletion(status);
              }}
            >
              {taskData.completion_status === "backlog"
                ? "In Progress"
                : taskData.completion_status === "in_progress"
                ? "Backlog"
                : taskData.completion_status === "completed"
                ? "In Progress"
                : null}
            </p>
          </div>

          <div
            onClick={() => {
              setEditMenu(false);
              setOptions(false);
            }}
          >
            {/* <EditRoundedIcon className="OIc" /> */}
            {taskData.completion_status === "backlog" ? (
              <CheckCircleIcon className="OIc" />
            ) : taskData.completion_status === "in_progress" ? (
              <CheckCircleIcon className="OIc" />
            ) : taskData.completion_status === "completed" ? (
              <PendingActionsIcon className="OIc" />
            ) : null}
            <p
              className="OButtons"
              onClick={() => {
                let status = 0;
                if (taskData.completion_status === "backlog") {
                  status = 2;
                } else if (taskData.completion_status === "in_progress") {
                  status = 2;
                } else if (taskData.completion_status === "completed") {
                  status = 0;
                }

                handleTaskCompletion(status);
              }}
            >
              {taskData.completion_status === "backlog"
                ? "Completed"
                : taskData.completion_status === "in_progress"
                ? "Completed"
                : taskData.completion_status === "completed"
                ? "Backlog"
                : null}
            </p>
          </div>

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
            <Link
              to={`/categories/${category.id}/tasks/${taskData.id}`}
              className="OButtons"
            >
              View
            </Link>
          </div>
        </div>
      )}

      {editMenu && (
        <div className="AddCContainer" onContextMenu={handleEditWindow}>
          <form className="AddCForm RForm" onSubmit={handleEditTask}>
            <p className="AddCTitle">Edit Task</p>
            <div className="AddCFormGroup">
              <label>Task Name</label>
              <br />
              <input
                className="AddCTexto"
                type="text"
                name="task_name"
                placeholder="Edit task name"
                value={taskData.task_name}
                onChange={onChangeEdit}
              />
            </div>

            <div className="AddCFormGroup">
              <label>Task Details</label>
              <br />
              <textarea
                className="AddCTextArea"
                name="task_details"
                placeholder="Edit task details"
                value={taskData.task_details}
                onChange={onChangeEdit}
              ></textarea>
            </div>

            <div className="AddCFormGroup">
              <label>Priority</label>
              <br />
              <select
                className="TSpriority"
                name="priority"
                value={taskData.priority}
                onChange={onChangeEdit}
              >
                <option value="">Select...</option>
                <option value={0}>Low</option>
                <option value={1}>Medium</option>
                <option value={2}>High</option>
              </select>
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
            <button className="AddCplus" onClick={() => setDeleteMenu(false)}>
              Cancel
            </button>
            <button className="AddCcancel" onClick={handleDeleteTask}>
              Delete
            </button>
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
              sortedTasks.map((task) => (
                <div
                  className="TCLi"
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
                  <Link to={`/categories/${category.id}/tasks/${task.id}`}>
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
                  </Link>
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
    </div>
  );
};

export default Category;
