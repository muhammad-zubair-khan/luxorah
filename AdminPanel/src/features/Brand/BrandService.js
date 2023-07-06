import axios from "axios";
import { config } from "../../axiosConfig";
import { base_Url } from "../../functions";

const getBrands = async () => {
  const response = await axios.get(`${base_Url}brand/`);

  return response?.data;
};

const addBrands = async (data) => {
  const response = await axios.post(`${base_Url}brand/`, data, config);
  return response?.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_Url}brand/${id}`, config);
  console.log(response);
  return response?.data;
};

const brandService = {
  getBrands,
  addBrands,
  deleteBrand,
  // getBrand,
  // updateBrand,
};

export default brandService;
