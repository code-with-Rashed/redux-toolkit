import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  tags: [],
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleSelectTag: (state, action) => {
      const isTagExist = state.tags.includes(action.payload);
      if (isTagExist) {
        const index = state.tags.indexOf(action.payload);
        state.tags.splice(index, 1);
      } else {
        state.tags.push(action.payload);
      }
    },
    searchingText: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { toggleSelectTag, searchingText } = filterSlice.actions;
