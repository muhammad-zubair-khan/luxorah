import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import productService from "./ProductService";
// import {toast} from 'react-toastify'
import toast, { Toaster } from "react-hot-toast";

export const getProducts = createAsyncThunk("product/", async (thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addProduct = createAsyncThunk(
  "product/create",
  async (productData, thunkAPI) => {
    try {
      return await productService.addProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductsBySlug = createAsyncThunk(
  "products/slug",
  async ({ slug, region, sort, brand, min, max, ratings}, thunkAPI) => {
    // Add the region parameter here
    try {
      return await productService.getProductsBySlug(
        slug,
        region,
        sort,
        brand,
        min,
        max,
        ratings,
      ); // Pass the region parameter to the productService function
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/id",
  async ({ id, region }, thunkAPI) => {
    try {
      return await productService.getProductById(id,region);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const addToWishList = createAsyncThunk(
//   "product/wishlist",
//   async (productId, thunkAPI) => {
//     try {
//       const response = await productService.addToWishList(productId);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const addToWishList = createAsyncThunk(
  "product/wishlist",
  async (productId, thunkAPI) => {
    try {
      // Check if the token exists
      const token = window.localStorage.getItem("access_token"); // Replace this with your own logic to retrieve the token
      if (!token) {
        toast.error("Not authorized, Login First!");
        return thunkAPI.rejectWithValue("Not authorized, no token provided");
      }

      const response = await productService.addToWishList(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRating = createAsyncThunk(
  "product/add/rating",
  async (data, thunkAPI) => {
    try {
      return await productService.addRating(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
        state.message = "Product Created Product";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductsBySlug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsBySlug.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.productsBySlug = action.payload;
        state.message = "success";
      })
      .addCase(getProductsBySlug.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.productById = action.payload;
        state.message = "success";
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.addToWishList = action.payload.user;
        state.message = "success";
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
        }
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === true) {
          toast.success(action.error);
        }
      })
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.rating = action.payload;
        state.message = "Rating Added Successfully";
        if (state.isSuccess === true) {
          toast.success("Rating Added Successfully");
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
