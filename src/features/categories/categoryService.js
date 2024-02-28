import axios from "axios";

const API_URL = "http://localhost:4000";

const createCategory = async (user_id, category) => {
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
    `${API_URL}/api/v1/users/${user_id}/categories`,
    { category },
    config
  );

  return response.data;
};

const getCategories = async (user_id) => {
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
    `${API_URL}/api/v1/users/${user_id}/categories`,
    config
  );

  return response.data;
};

const editCategory = async (user_id, id, category) => {
  const token = JSON.parse(localStorage.getItem("authToken"));

  if (!token) {
    console.error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const allowedAttributes = {
    category_name: category.category_name,
    category_details: category.category_details,
  };

  const response = await axios.patch(
    `${API_URL}/api/v1/users/${user_id}/categories/${id}`,
    { category: allowedAttributes },
    config
  );

  return response.data;
};

const deleteCategory = async (user_id, id) => {
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
    `${API_URL}/api/v1/users/${user_id}/categories/${id}`,
    config
  );

  return response.data;
};

const categoryService = {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
};

export default categoryService;
