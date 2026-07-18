import { configureStore } from "@reduxjs/toolkit";
import allPostSlice from "../features/allPost/allPostSlice";
const store = configureStore({
  reducer: {
    allPost: allPostSlice,
  },
});
export default store;
