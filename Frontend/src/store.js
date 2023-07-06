import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./features/Cataglog/Category/CategorySlice";
import productReducer from "./features/Cataglog/Product/ProductSlice";
import authReducer from "./features/User/UserSlice"
import contactReducer from "./features/Contact/ContactSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    enquiry: contactReducer,
  },
});

export default store;
