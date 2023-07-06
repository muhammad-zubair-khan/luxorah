import axios from "axios";
import { config } from "../../axiosConfig";
import { base_Url } from "../../functions";

const getContacts = async () => {
  const response = await axios.get(`${base_Url}enquiry/`);
  return response?.data;
};


const deleteContact = async (id) => {
  const response = await axios.delete(`${base_Url}enquiry/${id}`, config);
  console.log(response);
  return response?.data;
};


const colorService = {
    getContacts,
    deleteContact,
};

export default colorService;
