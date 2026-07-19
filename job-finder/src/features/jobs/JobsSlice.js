import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addJob,
  deleteJob,
  fetchAllJobs,
  fetchEditableJob,
  updateJob,
} from "./JobsApi";

// initial state
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  jobs: [],
  job: {},
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

export const getEditableJob = createAsyncThunk(
  "jobs/getEditableJob",
  async (id) => {
    const response = await fetchEditableJob(id);
    return response;
  },
);

export const editJob = createAsyncThunk("jobs/editJob", async (data) => {
  const response = await updateJob(data);
  return response;
});

export const removeJob = createAsyncThunk("jobs/removeJob", async (id) => {
  const response = await deleteJob(id);
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

    // get editable job
    builder
      .addCase(getEditableJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEditableJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.job = action.payload;
      })
      .addCase(getEditableJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error?.message;
        state.job = {};
      });

    // edit existing job
    builder.addCase(editJob.fulfilled, (state, action) => {
      state.jobs = state.jobs.map((job) => {
        if (job.id === action.payload.id) {
          return action.payload;
        }
        return job;
      });
    });

    // delete job
    builder.addCase(removeJob.fulfilled, (state, action) => {
      const id = action.meta.arg;
      state.jobs = state.jobs.filter((job) => job.id !== id);
    });
  },
});

export default JobsSlice.reducer;
