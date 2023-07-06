import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import sizeService from "./SizeService";
import { toast } from "react-hot-toast";

export const getSizes = createAsyncThunk("size/", async (thunkAPI) => {
  try {
    return await sizeService.getSizes();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addSize = createAsyncThunk(
  "size/create",
  async (sizeData, thunkAPI) => {
    try {
      return await sizeService.addSize(sizeData);
    } catch (error) {
      if (
        error.response.data.message.startsWith(
          "MongoServerError: E11000 duplicate key error collection"
        )
      ) {
        return thunkAPI.rejectWithValue("This Size is Already Exist!");
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteSize = createAsyncThunk(
  "size/delete",
  async (id, thunkAPI) => {
    try {
      return await sizeService.deleteSize(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  sizes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const sizeSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSizes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSizes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sizes = action.payload;
      })
      .addCase(getSizes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdSize = action.payload;
        state.message = "success";
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
        }
      })
      .addCase(addSize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload);
        }
      })
      //   .addCase(updateAColor.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(updateAColor.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = false;
      //     state.isSuccess = true;
      //     state.updatedColor = action.payload;
      //   })
      //   .addCase(updateAColor.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = true;
      //     state.isSuccess = false;
      //     state.message = action.error;
      //   })
      //   .addCase(getAColor.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(getAColor.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = false;
      //     state.isSuccess = true;
      //     state.colorName = action.payload.title;
      //   })
      //   .addCase(getAColor.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = true;
      //     state.isSuccess = false;
      //     state.message = action.error;
      //   })
      .addCase(deleteSize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedSize = action.payload;
        if(state.isSuccess === true){
          toast.success(action.payload.message)
        }
      })
      .addCase(deleteSize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError === true){
          toast.error(action.error)
        }
      })
      .addCase(resetState, () => initialState);
  },
});
export default sizeSlice.reducer;
