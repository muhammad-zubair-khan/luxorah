import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./ColorService";
import { toast } from "react-hot-toast";
export const getColors = createAsyncThunk("color/", async (thunkAPI) => {
  try {
    return await colorService.getColors();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addColor = createAsyncThunk(
  "color/create",
  async (colorData, thunkAPI) => {
    try {
      return await colorService.addColor(colorData);
    } catch (error) {
      if (
        error.response.data.message.startsWith(
          "MongoServerError: E11000 duplicate key error collection"
        )
      ) {
        return thunkAPI.rejectWithValue("This Color is Already Exist!");
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "color/delete",
  async (id, thunkAPI) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
        state.message = "success";
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
        }
      })
      .addCase(addColor.rejected, (state, action) => {
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
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
        if(state.isSuccess === true){
          toast.success(action.payload.message)
        }
      })
      .addCase(deleteColor.rejected, (state, action) => {
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
export default colorSlice.reducer;
