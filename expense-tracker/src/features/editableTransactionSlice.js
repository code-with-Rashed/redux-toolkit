import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editMode: false,
  transaction: {},
};

const editableTransactionSlice = createSlice({
  name: "editable-transaction",
  initialState,
  reducers: {
    editableTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    editModeToggle: (state, action) => {
      state.editMode = action.payload;
    },
  },
});
export default editableTransactionSlice.reducer;
export const { editableTransaction, editModeToggle } =
  editableTransactionSlice.actions;
