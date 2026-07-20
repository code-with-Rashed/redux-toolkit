import { configureStore } from "@reduxjs/toolkit";
import JobsSlice from "../features/jobs/JobsSlice";
import filterSlice from "../features/filters/filterSlice";

const store = configureStore({
  reducer: {
    jobs: JobsSlice,
    filters: filterSlice,
  },
});
export default store;
