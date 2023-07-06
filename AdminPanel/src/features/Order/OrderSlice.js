import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import orderService from "./OrderService";
import { toast } from "react-hot-toast";

export const getAllOrders = createAsyncThunk("orders/", async (thunkAPI) => {
  try {
    return await orderService.getAllOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (id, thunkAPI) => {
    try {
      return await orderService.deleteOrder(id);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        (state.message = "success"), (state.orders = action.payload);
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedOrder = action.payload;
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
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
export default orderSlice.reducer;
