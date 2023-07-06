import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import imageService from "./ImageService";
import { toast } from "react-hot-toast";

// export const uploadImg = createAsyncThunk(
//   "upload/images",
//   async (data, thunkAPI) => {
//     try {
//       const formData = new FormData();
//       for (let i = 0; i < data.length; i++) {
//         formData.append("images", data[i]);
//       }
//       return await imageService.uploadImg(formData);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await imageService.uploadImg(formData);
    } catch (error) {
      console.error("error-->", error);
      if (error.response.data.message === "File too large") {
        return thunkAPI.rejectWithValue(
          "File size should not exceed 2MB. Please select a smaller file."
        );
      } else if (error.response.data.message === "File too large") {
        return thunkAPI.rejectWithValue(
          "File size should not exceed 2MB. Please select a smaller file."
        );
      }
      // Return a custom error message instead of the error object
      return thunkAPI.rejectWithValue("Image upload failed. File Format UnSupported!");
    }
  }
);

export const uploadCategoryImg = createAsyncThunk(
  "upload/categoryImage",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await imageService.uploadCategoryImg(formData);
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
      console.error("error-->", error);
      if (error.response.data.message === "File too large") {
        return thunkAPI.rejectWithValue(
          "File size should not exceed 2MB. Please select a smaller file."
        );
      } else if (error.response.data.message === "File too large") {
        return thunkAPI.rejectWithValue(
          "File size should not exceed 2MB. Please select a smaller file."
        );
      }
      // Return a custom error message instead of the error object
      return thunkAPI.rejectWithValue("Image upload failed. File Format UnSupported!");
    }
  }
);

export const delImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      return await imageService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetImageState = createAction("Reset_all");

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const uploadSlice = createSlice({
  name: "imaegs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
        state.message = "success";
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
        }
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "failed";
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })
      .addCase(uploadCategoryImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadCategoryImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryImages = action.payload;
        state.message = "success";
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
        }
      })
      .addCase(uploadCategoryImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetImageState, () => initialState);
  },
});
export default uploadSlice.reducer;
