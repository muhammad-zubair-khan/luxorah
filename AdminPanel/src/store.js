import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import customerReducer from "./features/customers/customerSlice";
import categoryReducer from "./features/Cataglog/Category/CategorySlice";
import productReducer from "./features/Cataglog/Product/ProductSlice";
import colorReducer from "./features/Color/ColorSlice";
import brandReducer from "./features/Brand/BrandSlice";
import sizeReducer from "./features/Size/SizeSlice";
import orderReducer from "./features/Order/OrderSlice";
import uploadReducer from "./features/images/ImagesSlice";
import contactReducer from "./features/Contact/ContactSlice";
import ratingReducer from "./features/Rating/RatingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    category: categoryReducer,
    product: productReducer,
    color: colorReducer,
    brand: brandReducer,
    size: sizeReducer,
    order: orderReducer,
    upload: uploadReducer,
    contact:contactReducer,
    ratings:ratingReducer,
  },
});

export default store;
