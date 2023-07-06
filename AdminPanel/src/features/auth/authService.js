import axios from "axios";
const base_Url = "http://localhost:5000/api/";

const login = async (userData) => {
  const response = await axios.post(`${base_Url}user/loginadmin`, userData);

  if (response?.data) {
    localStorage.setItem("userInfo", JSON.stringify(response?.data));
    localStorage.setItem("access_token", response?.data?.token);
  }
  return response.data;
};

const forgotPassword = async (data) => {
  const response = await axios.post(
    `${base_Url}user/forgot-password-token`,
    data
  );
  return response?.data;
};

const updatePassword = async (data) => {
  const response = await axios.put(`${base_Url}user/password`, data);
  return response?.data;
};

const logout = async () => {
  await axios.get(`${base_Url}user/logout`);
  // localStorage.removeItem("userInfo");
  // localStorage.removeItem("access_token");
};

const authService = {
  login,
  logout,
  forgotPassword,
  updatePassword,
};

export default authService;
