import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { authService } from "./UserService";

export const googleLogin = createAsyncThunk(
  "auth/google/login",
  async (tokenId, thunkAPI) => {
    try {
      return authService.googleLogin(tokenId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk("auth/user", async (thunkAPI) => {
  try {
    return authService.getUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logoutUser = createAsyncThunk(
  "auth/google/logout",
  async (thunkAPI) => {
    try {
      return authService.logoutUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWishList = createAsyncThunk(
  "auth/wishlist",
  async (thunkAPI) => {
    try {
      return authService.getWishList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAOrder = createAsyncThunk(
  "auth/order",
  async (orderDetail, thunkAPI) => {
    try {
      return authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getUserOrders = createAsyncThunk(
  "auth/order/get",
  async (thunkAPI) => {
    try {
      return authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("ResetAll");

// const getUserFromLocalStorage = localStorage.getItem("customer")
//   ? JSON.parse(localStorage.getItem("customer"))
//   : null;

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  wishlist: null,
  toastShown: false,

};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
        if (state.isSuccess === true) {
          localStorage.setItem("access_token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          toast.success("User Loggedin Successfully");
        }
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = {
          user: JSON.parse(localStorage.getItem("user")),
          token: localStorage.getItem("access_token"),
        };
        state.message = "success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = 'failed';
        // if(state.isError === true){
        //   toast.error(action?.error?.message)
        // }
        if (!state.toastShown && action.error && action.error.message) {
          toast.error(action.error.message);
          state.toastShown = true;
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = null;
        state.user = {
          user: null,
          token: null,
        };
        state.message = "success";
        if (state.isSuccess === true) {
          localStorage.clear();
          toast.success("User logout Successfully");
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "failed";
      })
      .addCase(getWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(createAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Order Placed Successfully!");
        }
      })
      .addCase(createAOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Something went wrong");
        }
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.getOrderedProduct = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
