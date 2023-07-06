import axios from "axios";
import { config } from "../../axiosConfig";
import { base_Url } from "../../functions";

const getColors = async () => {
  const response = await axios.get(`${base_Url}color/`);
  return response?.data;
};

const addColor = async (data) => {
  const response = await axios.post(`${base_Url}color/`, data, config);
  return response?.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${base_Url}color/${id}`, config);
  console.log(response);
  return response?.data;
};


const colorService = {
  getColors,
  addColor,
  deleteColor,
  //   updateColor,
  //   getColor,
};

export default colorService;
