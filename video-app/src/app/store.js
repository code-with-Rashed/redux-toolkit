import { configureStore } from "@reduxjs/toolkit";
import videosSlice from "../features/videos/videosSlice";

const store = configureStore({
  reducer: {
    videos: videosSlice,
  },
});
export default store;
