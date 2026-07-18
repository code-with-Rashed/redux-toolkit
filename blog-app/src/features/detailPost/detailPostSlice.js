import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchDetailPost,
  updatePostLikes,
  updatePostStatus,
} from "./detailPostApi";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  post: {},
};
export const getDetailPost = createAsyncThunk(
  "posts/fetchDetailPost",
  async (id) => {
    const response = await fetchDetailPost(id);
    return response;
  },
);
export const changePostStatus = createAsyncThunk(
  "post/changePostStatus",
  async (data) => {
    const response = await updatePostStatus(data);
    return response;
  },
);
export const changePostLikes = createAsyncThunk(
  "post/changePostLikes",
  async (data) => {
    const response = await updatePostLikes(data);
    return response;
  },
);
const detailPostSlice = createSlice({
  name: "detail-post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDetailPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDetailPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.post = action.payload;
    });
    builder.addCase(getDetailPost.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = action.error?.message;
      state.post = {};
    });
  },
});

export default detailPostSlice.reducer;
