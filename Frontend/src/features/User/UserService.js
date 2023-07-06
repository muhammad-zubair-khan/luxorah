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
    console.log(error)
    // alert(error.response.data.message)
    // toast.error('Not Authorized, Session Expired, Please Login Again')
    throw new Error("Session Expired, Please Login Again");
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
