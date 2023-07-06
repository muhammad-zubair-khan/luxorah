import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  forgotPasswordLoading: false,
  forgotPasswordError: null,
  forgotPasswordSuccess: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "user/loginadmin",
  async (user, thunkAPI) => {
    try {
      // const response = await authService.login(user);
      return await authService.login(user);
      // return response.data; // Return the data from the response
    } catch (error) {
      // Handle the error and pass the error message as the payload
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkAPI) => {
    try {
      // const response = await authService.login(user);
      return await authService.forgotPassword(email);
      // return response.data; // Return the data from the response
    } catch (error) {
      // Handle the error and pass the error message as the payload
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/password",
  async (data, thunkAPI) => {
    try {
      // const response = await authService.login(user);
      return await authService.updatePassword(data);
      // return response.data; // Return the data from the response
    } catch (error) {
      // Handle the error and pass the error message as the payload
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    // await authService.logout(); // Assuming you have a logout method in your authService
    localStorage.removeItem("userInfo"); // Remove the user info from localStorage
    localStorage.removeItem("access_token");
    return null; // Return null as the payload to indicate successful logout
  } catch (error) {
    // Handle the error and pass the error message as the payload
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
  // localStorage.removeItem("userInfo");
  // localStorage.removeItem("access_token");
  // delete axios.defaults.headers.common["Authorization"];
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = "Logout successful";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = null;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = action.payload;
        state.forgotPasswordSuccess = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newPassword = action.payload;
        state.message = "Password Updated successful";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        state.newPassword = null;
      })
      ;
  },
});

export default authSlice.reducer;
