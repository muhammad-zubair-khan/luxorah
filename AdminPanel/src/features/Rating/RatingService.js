import axios from "axios";
import { config } from "../../axiosConfig";
import { base_Url } from "../../functions";

const getRatings = async () => {
  const response = await axios.get(`${base_Url}product/allrating`);
  return response?.data;
};


const deleteRating = async (id) => {
  const response = await axios.delete(`${base_Url}product/delete/rating/${id}`, config);
  console.log(response);
  return response?.data;
};


const ratingService = {
    getRatings,
    deleteRating,
};

export default ratingService;
