import axios from "axios";
import { config } from "../../axiosConfig";
import { base_Url } from "../../functions";

const getSizes = async () => {
  const response = await axios.get(`${base_Url}size/`);
  return response?.data;
};

const addSize = async (data) => {
  const response = await axios.post(`${base_Url}size/`, data, config);
  return response?.data;
};

const deleteSize = async (id) => {
  const response = await axios.delete(`${base_Url}size/${id}`, config);
  console.log(response);
  return response?.data;
};


const sizeService = {
  getSizes,
  addSize,
  deleteSize,
  //   updateSize,
  //   getSize,
};

export default sizeService;
