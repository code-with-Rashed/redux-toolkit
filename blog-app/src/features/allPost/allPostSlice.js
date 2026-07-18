import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAllPost from "./allPostApi";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  posts: [],
};

export const getAllPost = createAsyncThunk("posts/getAllPost", async (filters) => {
  const result = await fetchAllPost(filters);
  return result;
});
const allPostSlice = createSlice({
  name: "all-post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = action.payload;
    });
    builder.addCase(getAllPost.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.posts = [];
    });
  },
});
export default allPostSlice.reducer;
