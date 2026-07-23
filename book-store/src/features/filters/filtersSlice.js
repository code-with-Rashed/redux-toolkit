import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "All",
  search: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filteringByType: (state, action) => {
      state.type = action.payload;
    },
    searching: (state, action) => {
      state.search = action.payload;
    },
  },
});
export default filtersSlice.reducer;
export const { filteringByType, searching } = filtersSlice.actions;
