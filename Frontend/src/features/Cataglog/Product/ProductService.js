import axios from "axios";
// import { base_Url } from "../../../functions";
// import { config } from "../../../axiosConfig";
import axiosInstance from "../../../axios";
// import axios from "../../../axios";

const getProducts = async () => {
  const response = await axiosInstance().get(`product/`);
  if (response.data) {
    return response?.data;
  }
};

const addProduct = async (data) => {
  const response = await axiosInstance().post(`product/`, data);
  if (response.data) {
    return response?.data;
  }
};

const deleteProduct = async (id) => {
  const response = await axiosInstance().delete(`product/${id}`);
  if (response.data) {
    return response?.data;
  }
};

// const getProductsBySlug = async (slug, region) => {
//   const response = await axiosInstance().get(`product/products/${slug}?region=${region}`);
//   if (response.data) {
//     return response.data;
//   }
// };

const getProductsBySlug = async (slug, region, sort, brand, min, max, ratings) => {
  try {
    let link = `product/products/${slug}`;
    const params = {};

    if (region) {
      params.region = region;
    }
    if (sort) {
      params.sort = sort;
    }
    if (brand) {
      params.brand = brand;
    }
    if (min) {
      params.min = min;
    }
    if (max) {
      params.max = max;
    }
    if(ratings){
      params.ratings = ratings
    }
    const response = await axiosInstance().get(link, { params });
    console.log("RES", response);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any error that occurred during the API request
    console.error("Error fetching products:", error);
    // You can throw an error or return a default value as needed
    throw error;
  }
};

const getProductById = async (id,region) => {
  const response = await axiosInstance().get(`product/detail/${id}/${region}`);
  if (response.data) {
    return response?.data;
  }
};

// const addToWishList = async (productId) => {
//   const response = await axios.put(`product/wishlist`,{productId});
//   if(response.data){
//     return response?.data;
//   }
// };

export const addToWishList = async (productId) => {
  try {
    const response = await axiosInstance().put(`product/wishlist`, {
      productId,
    });

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const addRating = async (data) => {
  const response = await axiosInstance().put(`product/rating`, data);
  if (response.data) {
    return response?.data;
  }
};

const productService = {
  getProducts,
  addProduct,
  deleteProduct,
  getProductsBySlug,
  getProductById,
  addToWishList,
  addRating,
};

export default productService;
