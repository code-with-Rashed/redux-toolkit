import { configureStore } from "@reduxjs/toolkit";
import allPostSlice from "../features/allPost/allPostSlice";
import detailPostSlice from "../features/detailPost/detailPostSlice";
import relatedPostsSlice from "../features/relatedPosts/relatedPostsSlice";
import filterSlice from "../features/filters/filterSlice";
const store = configureStore({
  reducer: {
    allPost: allPostSlice,
    detailPost: detailPostSlice,
    relatedPosts: relatedPostsSlice,
    filters: filterSlice,
  },
});
export default store;
