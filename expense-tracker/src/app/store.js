import { configureStore } from "@reduxjs/toolkit";
import expenseTransactionsSlice from "../features/expenseTransactionsSlice";
import editableTransactionSlice from "../features/editableTransactionSlice";

const store = configureStore({
  reducer: {
    transactions: expenseTransactionsSlice,
    editTransaction: editableTransactionSlice,
  },
});
export default store;
