import { configureStore } from "@reduxjs/toolkit";
import expenseTransactionsSlice from "../features/expenseTransactionsSlice";
const store = configureStore({
  reducer: {
    transactions: expenseTransactionsSlice,
  },
});
export default store;
