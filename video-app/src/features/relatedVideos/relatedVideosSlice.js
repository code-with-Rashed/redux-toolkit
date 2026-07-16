import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchRelatedVideos from "./relatedVideosApi";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  videos: [],
};

export const getRelatedVideos = createAsyncThunk(
  "related-videos/fetchRelatedVideos",
  async ({ id, tags }) => {
    const response = await fetchRelatedVideos(id, tags);
    return response;
  },
);
const relatedVideosSlice = createSlice({
  name: "related-videos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRelatedVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRelatedVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.videos = action.payload;
    });
    builder.addCase(getRelatedVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.videos = [];
    });
  },
});

export default relatedVideosSlice.reducer;
