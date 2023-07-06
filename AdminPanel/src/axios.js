import axios from "axios";

const base_Url = "http://localhost:5000/api/";

const axiosInstance = axios.create({
  baseURL: base_Url,
  timeout: 91000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
