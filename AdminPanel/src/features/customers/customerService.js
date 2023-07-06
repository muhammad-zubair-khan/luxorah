import axios from "../../axios";
import { base_Url } from "../../functions";

const getUsers = async () => {
  const response = await axios.get(`${base_Url}user/allusers`);
  console.log(response);
  return response?.data;
};
const getUser = async (id) => {
  const response = await axios.get(`${base_Url}user/${id}`);
  console.log(response);
  return response?.data;
};
const blockUser = async (id) => {
  const response = await axios.put(`${base_Url}user/blockuser/${id}`);
  console.log(response);
  return response?.data;
};
const unBlockUser = async (id) => {
  const response = await axios.put(`${base_Url}user/unblockuser/${id}`);
  console.log(response);
  return response?.data;
};

const customerService = {
  getUsers,
  getUser,
  blockUser,
  unBlockUser
};

export default customerService;
