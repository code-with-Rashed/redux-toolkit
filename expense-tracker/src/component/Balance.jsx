import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenseTransactions } from "../features/expenseTransactionsSlice";
import amountFormat from "../utilities/amountFormat";
const Balance = () => {
  const allTransactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllExpenseTransactions());
  }, [dispatch]);
  const { isLoading, isError, error, transactions } = allTransactions;
  let content = null;
  if (isLoading) {
    content = <span className="loading">Loading...</span>;
  }
  if (!isLoading && isError) {
    content = <span className="error">{error}</span>;
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <span className="error">00</span>;
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = (
      <span>
        {amountFormat(
          transactions.reduce(
            (acc, transaction) => acc + transaction.amount,
            0,
          ),
        )}
      </span>
    );
  }
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        {content}
      </h3>
    </div>
  );
};
export default Balance;
