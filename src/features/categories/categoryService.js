import axios from "axios";

const API_URL = "http://localhost:4000";

const token = JSON.parse(localStorage.getItem("authToken"));

const createCategory = async (user_id, category) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/api/v1/users/${user_id}/categories`,
    { category },
    config
  );

  return response.data;
};

const getCategories = async (user_id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/api/v1/users/${user_id}/categories`,
    config
  );

  return response.data;
};

const categoryService = {
  getCategories,
  createCategory,
};

export default categoryService;
