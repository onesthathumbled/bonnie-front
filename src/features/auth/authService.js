import axios from "axios";

// const API_URL = "http://localhost:4000";
const API_URL = "https://mysite-e3v9.onrender.com";

const register = async (user) => {
  const response = await axios.post(`${API_URL}/signup`, { user });

  const authToken = response.headers.authorization;

  if (authToken) {
    const tokenWithoutBearer = authToken.replace(/^Bearer\s+/i, "");

    localStorage.setItem("authToken", JSON.stringify(tokenWithoutBearer));
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${API_URL}/login`, { user });

  const authToken = response.headers.authorization;

  if (authToken) {
    const tokenWithoutBearer = authToken.replace(/^Bearer\s+/i, "");

    localStorage.setItem("authToken", JSON.stringify(tokenWithoutBearer));
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
