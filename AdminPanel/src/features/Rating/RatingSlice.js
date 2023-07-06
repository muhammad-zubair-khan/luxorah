import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ratingService from "./RatingService";
import { toast } from "react-hot-toast";
export const getRatings = createAsyncThunk("rating/", async (thunkAPI) => {
  try {
    return await ratingService.getRatings();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteRating = createAsyncThunk(
  "rating/delete",
  async (id, thunkAPI) => {
    try {
      return await ratingService.deleteRating(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  ratings: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRatings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRatings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ratings = action.payload;
      })
      .addCase(getRatings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedRating = action.payload.title;
        if (state.isSuccess === true) {
          toast.success(action.payload.message);
        }
      })
      .addCase(deleteRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(resetState, () => initialState);
  },
});
export default ratingSlice.reducer;
