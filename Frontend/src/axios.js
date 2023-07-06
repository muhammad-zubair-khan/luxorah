// import axios from "axios";

// const base_Url = "http://localhost:5000/api/";

// const axiosInstance = () => {
//   const token = window.localStorage.getItem("token");

//   return axios.create({
//     baseURL: base_Url,
//     headers: {
//       Authorization: `Bearer ${token ? token : ''}`,
//     },
//   });
// };
import axios from "axios";

const base_Url = "http://localhost:5000/api/";

const axiosInstance = () => {
  const token = window.localStorage.getItem("access_token");

  return axios.create({
    baseURL: base_Url,
    headers: {
      Authorization: `Bearer ${token ? token : ''}`,
    },
  });
};

export default axiosInstance;