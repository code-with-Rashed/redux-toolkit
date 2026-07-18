import { configureStore } from "@reduxjs/toolkit";
import allPostSlice from "../features/allPost/allPostSlice";
import detailPostSlice from "../features/detailPost/detailPostSlice";
const store = configureStore({
  reducer: {
    allPost: allPostSlice,
    detailPost: detailPostSlice,
  },
});
export default store;
