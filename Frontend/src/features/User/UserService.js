import axiosInstance from "../../axios";
import axios from "axios";
import {toast} from 'react-hot-toast'
const googleLogin = async (tokenId) => {
  const response = await axios.post(`http://localhost:5000/api/user/googlelogin`, { tokenId: tokenId });
  if (response?.data) {
    return response?.data;
  }
};

const logoutUser = async () => {
  const response = await axios.get(`http://localhost:5000/api/user/googleLogout`);
  console.log("response-->", response);
  if (response?.data) {
    return response?.data;
  }
};


// const getUser = async () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   return user;
// };
// const getUser = async () => {
//   try {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       throw new Error("No token found.");
//     }

//     const response = await axios.get("http://localhost:5000/api/user/getuser", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data.user;
//   } catch (error) {
//     alert(error.response.data.message)
//     // toast.error('Not Authorized, Session Expired, Please Login Again')
//     // throw new Error("Failed to get user.");
//   }
// };
const getUser = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No token found.");
    }

    const response = await axios.get("http://localhost:5000/api/user/getuser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      alert(error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(error.message);
    }

    throw new Error("Failed to get user.");
  }
};

const getWishList = async () => {
  const response = await axiosInstance().get(`user/wishlist/`);
  if (response?.data) {
    return response?.data;
  }
};

const createOrder = async (orderDetail) => {
  const response = await axiosInstance().post(
    `user/saveOrder`,
    orderDetail,
  );
  if (response?.data) {
    return response?.data;
  }
};

const getOrders = async () => {
  const response = await axiosInstance().get(`user/orders/`);
  if (response?.data) {
    return response?.data;
  }
};

export const authService = {
  getWishList,
  createOrder,
  getOrders,
  getUser,
  logoutUser,
  googleLogin,
};
