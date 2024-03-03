import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSelector } from "react-redux";
import "../styles/Task.css";

const Task = () => {
  const { category_id, task_id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.tasks);

  // Convert task_id to a number
  const taskId = parseInt(task_id, 10);

  // Filter tasks based on the converted taskId
  const selectedTask = tasks.find((task) => task.id === taskId);

  if (!selectedTask) {
    // Handle the case where the task is not found
    return (
      <div className="Task">
        <p>Task not found</p>
      </div>
    );
  }

  return (
    <div className="Task">
      <div className="SCategory">
        <button className="SBack" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </button>
        <div className="SBlock">
          <p className="STitle">{selectedTask.task_name}</p>
          <p className="SId">Task ID: {selectedTask.id}</p>
          <p className="SDetails">{selectedTask.task_details}</p>
          <p className="SDate">
            {new Date(selectedTask.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;
