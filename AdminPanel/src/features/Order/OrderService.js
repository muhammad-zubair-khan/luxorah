import axios from "axios";
import { config } from "../../axiosConfig";
import { base_Url } from "../../functions";

const getAllOrders = async () => {
  const response = await axios.get(`${base_Url}user/getorders`);
  return response?.data;
};

const deleteOrder = async (id) => {
  const response = await axios.delete(`${base_Url}user/order/${id}`, config);
  return response?.data;
};


const orderService = {
  getAllOrders,
  deleteOrder
};

export default orderService;
