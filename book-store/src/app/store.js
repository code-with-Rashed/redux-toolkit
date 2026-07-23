import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import filtersSlice from "../features/filters/filtersSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filters: filtersSlice,
  },
  middleware: (getDefaultMiddleWares) =>
    getDefaultMiddleWares().concat(apiSlice.middleware),
});
export default store;
