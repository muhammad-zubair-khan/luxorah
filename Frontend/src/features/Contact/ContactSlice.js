import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import contactService from "./ContactService";
// import {toast} from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';

export const getEnquiries = createAsyncThunk("enquiry/", async (thunkAPI) => {
  try {
    return await contactService.getEnquiries();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addEnquiry = createAsyncThunk(
  "add/enquiry",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.addEnquiry(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiry/delete",
  async (id, thunkAPI) => {
    try {
      return await contactService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEnquiryById = createAsyncThunk(
  "enquiry/get/id",
  async (id, thunkAPI) => {
    try {
      return await contactService.getEnquiryById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "enquiry/update/id",
  async (id, thunkAPI) => {
    try {
      return await contactService.updateEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  enquiries: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "enquiry",
  initialState:initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEnquiry.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.newEnquiry = action.payload;
        if(state.isSuccess === true){
            toast.success("Message Submitted Successfully!")
        }
      })
      .addCase(addEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError === true){
            toast.error("Message Submitted Failed!")
        }
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getEnquiryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiryById.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleEnquiry = action.payload;
        // state.message = "success";
      })
      .addCase(getEnquiryById.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
        // state.message = "success";
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default contactSlice.reducer;
