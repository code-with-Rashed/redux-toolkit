import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import updateLikesUnlikes from "./likesUnlikesApi";

const initialState = {
  likes: 0,
  unlikes: 0,
};

export const updateLikesUnlikesCount = createAsyncThunk(
  "likes-unlikes/updateLikesUnlikes",
  async (data) => {
    const response = await updateLikesUnlikes(data);
    return response;
  },
);

const likesUnlikesSlice = createSlice({
  name: "likes-unlikes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateLikesUnlikesCount.fulfilled, (state, action) => {
      state.likes = action.payload.likes;
      state.unlikes = action.payload.unlikes;
    });
  },
});
export default likesUnlikesSlice.reducer;
