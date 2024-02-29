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
    },
  };

  const response = await axios.post(
    `${API_URL}/api/v1/users/${user_id}/categories/${category_id}/tasks`,
    { task },
    config
  );

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
    },
  };

  const response = await axios.get(
    `${API_URL}/api/v1/users/${user_id}/categories/${category_id}/tasks`,
    config
  );

  return response.data;
};

const taskService = {
  createTask,
  getTasks,
};

export default taskService;
