import axios from "axios";
import { base_Url } from "../../../functions";
import { config } from "../../../axiosConfig";

const addCategory = async (category) => {
  const response = await axios.post(
    `${base_Url}category/add`,
    category,
    config
  );
  console.log(response);
  return response?.data;
};

const getCategories = async () => {
  const response = await axios.get(`${base_Url}category/`);
  console.log(response);
  return response?.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_Url}category/${id}`, config);
  console.log(response);
  return response?.data;
};

const categoryService = {
  addCategory,
  getCategories,
  deleteCategory,
};

export default categoryService;
