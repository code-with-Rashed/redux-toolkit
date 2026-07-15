import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchVideosApi from "./videosApi";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  videos: [],
};

export const getVideos = createAsyncThunk("videos/getVideos", async () => {
  const response = await fetchVideosApi();
  return response;
});
const videosSlice = createSlice({
  name: "videos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getVideos.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.videos = action.payload;
    });
    builder.addCase(getVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default videosSlice.reducer;
