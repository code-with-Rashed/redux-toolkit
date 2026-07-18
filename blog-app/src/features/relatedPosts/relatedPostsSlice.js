import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchRelatedPosts from "./relatedPostsApi";
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  posts: [],
};
export const getRelatedPosts = createAsyncThunk(
  "posts/fetchRelatedPosts",
  async (dataForFiltering) => {
    const response = await fetchRelatedPosts(dataForFiltering);
    return response;
  },
);
const relatedPostsSlice = createSlice({
  name: "related-post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRelatedPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRelatedPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = action.payload;
    });
    builder.addCase(getRelatedPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = action.error?.message;
      state.posts = [];
    });
  },
});

export default relatedPostsSlice.reducer;
