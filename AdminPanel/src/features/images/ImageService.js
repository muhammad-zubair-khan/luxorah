import axios from "axios";
import { config } from "../../axiosConfig";
import { base_Url } from "../../functions";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_Url}upload/`, data, config);
  console.log("response",response)
  return response.data;
};

const uploadCategoryImg = async (data) => {
  console.log(config)
  const response = await axios.post(`${base_Url}upload/add`, data, config);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_Url}upload/delete-img/${id}`,
    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
  uploadCategoryImg,
};

export default uploadService;
