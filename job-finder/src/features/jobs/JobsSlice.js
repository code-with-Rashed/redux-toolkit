import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addJob, fetchAllJobs } from "./JobsApi";

// initial state
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  jobs: [],
};

// Thunks
export const getAllJobs = createAsyncThunk("jobs/getAllJobs", async () => {
  const response = await fetchAllJobs();
  return response;
});
export const addNewJob = createAsyncThunk("jobs/addNewJob", async (data) => {
  const response = await addJob(data);
  return response;
});

// slice
const JobsSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error?.message;
        state.jobs = [];
      });

    // add new job reducer
    builder.addCase(addNewJob.fulfilled, (state, action) => {
      state.jobs.push(action.payload);
    });
  },
});

export default JobsSlice.reducer;
