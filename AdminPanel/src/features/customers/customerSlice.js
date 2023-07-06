import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customerService from "./customerService";
import {toast} from 'react-hot-toast'
export const getUsers = createAsyncThunk("user/allusers", async (thunkAPI) => {
  try {
    return await customerService.getUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getUser = createAsyncThunk("user/id", async (id, thunkAPI) => {
  try {
    return await customerService.getUser(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const blockUser = createAsyncThunk(
  "user/block/id",
  async (id, thunkAPI) => {
    try {
      return await customerService.blockUser(id);
    } catch (error) {
      throw error; // Throw the error to trigger the rejected action
    }
  }
);

export const unBlockUser = createAsyncThunk("user/unBlock/id", async (id, thunkAPI) => {
  try {
    return await customerService.unBlockUser(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
        state.message = "success";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customerById = action.payload;
        state.message = "success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(blockUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess === true) {
          toast.success("Blocked Successfully");
          state.customerById.isBlocked = true;
        }
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        toast.error("Something went wrong");
      })
      .addCase(unBlockUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unBlockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if(state.isSuccess === true){
          toast.success("UnBlocked Successfully");
          state.customerById.isBlocked = false;
        }
      })
      .addCase(unBlockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError === true){
          toast.error("Something went wrong")
        }
      })
  },
});

export default customerSlice.reducer;
