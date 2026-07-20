import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterByType: "",
  sortBySalary: "",
  search: "",
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filteringByType: (state, action) => {
      state.filterByType = action.payload;
    },
    sortingBySalary: (state, action) => {
      state.sortBySalary = action.payload;
    },
    searching: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filteringByType, sortingBySalary, searching } =
  filterSlice.actions;
