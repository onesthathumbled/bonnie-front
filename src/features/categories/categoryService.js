import axios from "axios";

const API_URL = "http://localhost:4000";

const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get();
};
