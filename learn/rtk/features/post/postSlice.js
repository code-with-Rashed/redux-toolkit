const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// import fetch from "node-fetch";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};
const getPosts = createAsyncThunk("post/getPosts", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  const posts = await response.json();
  return posts;
});
const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.error = "";
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

module.exports = postSlice.reducer;
module.exports.getAllPosts = getPosts;
