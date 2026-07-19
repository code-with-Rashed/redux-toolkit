import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addExpenseTransaction,
  deleteTransaction,
  fetchAllExpenseTransactions,
  updateExpenseTransaction,
} from "./expenseTransactionsApi";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  transactions: [],
};

// thunks
export const getAllExpenseTransactions = createAsyncThunk(
  "transactions/fetchAllExpenseTransactions",
  async () => {
    const response = await fetchAllExpenseTransactions();
    return response;
  },
);

export const addNewExpenseTransaction = createAsyncThunk(
  "transactions/addExpenseTransaction",
  async (data) => {
    const response = await addExpenseTransaction(data);
    return response;
  },
);

export const updatedExpenseTransaction = createAsyncThunk(
  "transactions/updateExpenseTransaction",
  async (data) => {
    const response = await updateExpenseTransaction(data);
    return response;
  },
);

export const removeTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    const response = await deleteTransaction(id);
    return response;
  },
);

// slice
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

    // delete Transaction
    builder.addCase(removeTransaction.fulfilled, (state, action) => {
      const deleteTransactionId = action.meta.arg;
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== deleteTransactionId,
      );
    });

    // add expense transaction
    builder.addCase(addNewExpenseTransaction.fulfilled, (state, action) => {
      state.transactions.push(action.payload);
    });

    // update expense transaction
    builder.addCase(updatedExpenseTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return action.payload;
        }
        return transaction;
      });
    });
  },
});
export default expenseTransactionSlice.reducer;
