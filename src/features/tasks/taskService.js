import axios from "axios";

const API_URL = "http://localhost:4000";

const createTask = async (user_id, category_id, task) => {
  const token = JSON.parse(localStorage.getItem("authToken"));

  if (!token) {
    console.error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${API_URL}/api/v1/users/${user_id}/categories/${category_id}/tasks`,
    { task },
    config
  );

  return response.data;
};

const getAllTasks = async (user_id) => {
  const token = JSON.parse(localStorage.getItem("authToken"));

  if (!token) {
    console.error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(`${API_URL}/api/v1/all_tasks`, config);

  return response.data;
};

const getTasks = async (user_id, category_id) => {
  const token = JSON.parse(localStorage.getItem("authToken"));

  if (!token) {
    console.error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(
    `${API_URL}/api/v1/users/${user_id}/categories/${category_id}/tasks`,
    config
  );

  return response.data;
};

const editTask = async (user_id, category_id, task_id, task) => {
  const token = JSON.parse(localStorage.getItem("authToken"));

  if (!token) {
    console.error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const allowedAttributes = {
    task_name: task.task_name,
    task_details: task.task_details,
    priority: task.priority,
  };

  const response = await axios.patch(
    `${API_URL}/api/v1/users/${user_id}/categories/${category_id}/tasks/${task_id}`,
    { task: allowedAttributes },
    config
  );

  return response.data;
};

const taskCompletion = async (user_id, category_id, task_id, task_status) => {
  const token = JSON.parse(localStorage.getItem("authToken"));

  if (!token) {
    console.error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const status = {
    completion_status: task_status,
  };

  const response = await axios.patch(
    `${API_URL}/api/v1/users/${user_id}/categories/${category_id}/tasks/${task_id}`,
    { task: status },
    config
  );

  return response.data;
};

const deleteTask = async (user_id, category_id, task_id) => {
  const token = JSON.parse(localStorage.getItem("authToken"));

  if (!token) {
    console.error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/api/v1/users/${user_id}/categories/${category_id}/tasks/${task_id}`,
    config
  );

  return response.data;
};

const taskService = {
  createTask,
  getAllTasks,
  getTasks,
  editTask,
  deleteTask,
  taskCompletion,
};

export default taskService;
