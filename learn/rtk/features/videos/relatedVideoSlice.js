const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  videos: [],
  error: "",
};
const fetchRelatedVideos = createAsyncThunk(
  "video/fetchRelatedVideos",
  async (tags) => {
    const params = new URLSearchParams();
    tags.forEach((tag) => {
      params.append("tags_like", tag);
    });
    const url = `http://localhost:9000/videos?${params.toString()}`;
    const response = await fetch(url);
    const videos = await response.json();
  },
);

const relatedVideoSlice = createSlice({
  name: "relatedVideo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedVideos.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
      console.log(action.payload);
      state.videos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

module.exports = relatedVideoSlice.reducer;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
