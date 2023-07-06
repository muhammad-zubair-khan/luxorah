import axiosInstance from "../../../axios";

const addCategory = async (category) => {
  const response = await axiosInstance().post(`category/add`, category);
  if (response.data) {
    return response?.data;
  }
};

const getCategories = async () => {
  const response = await axiosInstance().get(`category/`);
  if (response.data) {
    return response?.data;
  }
};

const getCategoriesByType = async (slug) => {
  const response = await axiosInstance().get(`category/categories/${slug}`);
  if (response.data) {
    return response?.data;
  }
};

const deleteCategory = async (id) => {
  const response = await axiosInstance().delete(`category/${id}`);
  if (response.data) {
    return response?.data;
  }
};

const categoryService = {
  addCategory,
  getCategories,
  deleteCategory,
  getCategoriesByType,
};

export default categoryService;
