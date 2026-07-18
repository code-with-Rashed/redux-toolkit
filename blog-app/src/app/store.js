import { configureStore } from "@reduxjs/toolkit";
import allPostSlice from "../features/allPost/allPostSlice";
import detailPostSlice from "../features/detailPost/detailPostSlice";
import relatedPostsSlice from "../features/relatedPosts/relatedPostsSlice";
const store = configureStore({
  reducer: {
    allPost: allPostSlice,
    detailPost: detailPostSlice,
    relatedPosts: relatedPostsSlice,
  },
});
export default store;
