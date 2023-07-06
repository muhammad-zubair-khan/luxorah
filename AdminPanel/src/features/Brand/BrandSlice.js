import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./BrandService";
import { toast } from "react-hot-toast";

export const getBrands = createAsyncThunk("brand/", async (thunkAPI) => {
  try {
    return await brandService.getBrands();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addBrands = createAsyncThunk(
  "brand/create",
  async (brandData, thunkAPI) => {
    try {
      return await brandService.addBrands(brandData);
    } catch (error) {
      console.error(error);
      if (
        // error.response.data.message ===
        // 'MongoServerError: E11000 duplicate key error collection: danyal_db.brands index: title_1 dup key: { title: "hdhh" }'
         error.response.data.message.startsWith('MongoServerError: E11000 duplicate key error collection')
      ) 
      {
        return thunkAPI.rejectWithValue("This Brand is Already Exist!");
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/delete",
  async (id, thunkAPI) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBrands.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdBrand = action.payload;
        state.message = "success";
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
        }
      })
      .addCase(addBrands.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // .addCase(createBrand.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(createBrand.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.createdBrand = action.payload;
      // })
      // .addCase(createBrand.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.error;
      // })
      // .addCase(getABrand.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getABrand.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.brandName = action.payload.title;
      // })
      // .addCase(getABrand.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.error;
      // })
      // .addCase(updateABrand.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updateABrand.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.updatedBrand = action.payload;
      // })
      // .addCase(updateABrand.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.error;
      // })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
        }
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
