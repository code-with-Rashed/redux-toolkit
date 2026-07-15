import { configureStore } from "@reduxjs/toolkit";
import videosSlice from "../features/videos/videosSlice";
import tagsSlice from "../features/tags/tagsSlice";

const store = configureStore({
  reducer: {
    videos: videosSlice,
    tags: tagsSlice,
  },
});
export default store;
