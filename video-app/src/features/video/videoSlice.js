import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchVideo from "./videoApi";

export const getVideo = createAsyncThunk("video/fetchVideo", async (id) => {
  const response = await fetchVideo(id);
  return response;
});

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  video: {},
};
const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getVideo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.video = action.payload;
    });
    builder.addCase(getVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});
export default videoSlice.reducer;
