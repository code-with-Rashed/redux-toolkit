import { configureStore } from "@reduxjs/toolkit";
import JobsSlice from "../features/jobs/JobsSlice";

const store = configureStore({
  reducer: {
    jobs: JobsSlice,
  },
});
export default store;
