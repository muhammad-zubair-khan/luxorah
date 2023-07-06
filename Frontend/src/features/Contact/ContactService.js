// import axios from "axios";
// import { base_Url } from "../../functions";
// import { config } from "../../axiosConfig";
import axiosInstance from "../../axios";
// import axios from "../../axios";

const getEnquiries = async () => {
  const response = await axiosInstance().get(`enquiry/`);
  if (response.data) {
    return response?.data;
  }
};

const addEnquiry = async (contactData) => {
  const response = await axiosInstance().post(`enquiry/`, contactData);
  if (response.data) {
    return response?.data;
  }
};

const deleteEnquiry = async (id) => {
  const response = await axiosInstance().delete(`enquiry/${id}`);
  if (response.data) {
    return response?.data;
  }
};

const getEnquiryById = async (id) => {
  const response = await axiosInstance().get(`enquiry/${id}`);
  if (response.data) {
    return response?.data;
  }
};

const updateEnquiry = async (id) => {
  const response = await axiosInstance().put(`enquiry/${id}`);
  if (response.data) {
    return response?.data;
  }
};

const contactService = {
  getEnquiries,
  addEnquiry,
  deleteEnquiry,
  getEnquiryById,
  updateEnquiry,
};

export default contactService;
