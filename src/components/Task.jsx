import React from "react";
import { useParams } from "react-router-dom";

const Task = () => {
  const { category_id, task_id } = useParams();

  return (
    <div>
      <p>Task Component for Category ID: {category_id}</p>
      <p>Task ID: {task_id}</p>
    </div>
  );
};

export default Task;
