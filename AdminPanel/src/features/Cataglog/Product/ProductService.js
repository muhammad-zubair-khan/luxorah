import axios from "axios";
import { base_Url } from "../../../functions";
import { config } from "../../../axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_Url}product/`);
  console.log(response);
  return response?.data;
};

const addProduct = async (data) => {
  const response = await axios.post(`${base_Url}product/`, data, config);
  console.log(response);
  return response?.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_Url}product/${id}`, config);
  console.log(response);
  return response?.data;
};

const productService = {
  getProducts,
  addProduct,
  deleteProduct,
};

export default productService;
