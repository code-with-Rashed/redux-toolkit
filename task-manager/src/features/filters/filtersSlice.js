import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  search: "",
  projects: [],
};
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    search: (state, action) => {
      state.search = action.payload;
    },
    selectedProjects: (state, action) => {
      if (state.projects.includes(action.payload)) {
        state.projects = state.projects.filter(
          (project) => project !== action.payload,
        );
      } else {
        state.projects.push(action.payload);
      }
    },
  },
});
export const { search, selectedProjects } = filtersSlice.actions;
export default filtersSlice.reducer;
