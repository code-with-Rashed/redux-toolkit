import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sortBy: "",
  filterBy: "",
};
const filterSlice = createSlice({
  name: "filter-and-sort",
  initialState,
  reducers: {
    sortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    filterBy: (state, action) => {
      state.filterBy = action.payload;
    },
  },
});
export default filterSlice.reducer;
export const { sortBy, filterBy } = filterSlice.actions;
