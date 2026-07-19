import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllExpenseTransactions } from "./expenseTransactionsApi";
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  transactions: [],
};
export const getAllExpenseTransactions = createAsyncThunk(
  "transactions/fetchAllExpenseTransactions",
  async () => {
    const response = await fetchAllExpenseTransactions();
    return response;
  },
);
const expenseTransactionSlice = createSlice({
  name: "expense-tracker",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllExpenseTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExpenseTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(getAllExpenseTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      });
  },
});
export default expenseTransactionSlice.reducer;
