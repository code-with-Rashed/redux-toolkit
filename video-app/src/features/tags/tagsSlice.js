import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchTagsApi from "./tagsApi";
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  tags: [],
};
export const getAllTags = createAsyncThunk("fetch/fetchAllTags", async () => {
  const response = await fetchTagsApi();
  return response;
});
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllTags.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllTags.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.tags = action.payload;
    });
    builder.addCase(getAllTags.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});
export default tagsSlice.reducer;
