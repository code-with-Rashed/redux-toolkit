import { useEffect } from "react";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenseTransactions } from "../../features/expenseTransactionsSlice";
const Transactions = () => {
  const allTransactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllExpenseTransactions());
  }, [dispatch]);
  const { isLoading, isError, error, transactions } = allTransactions;
  let content = null;
  if (isLoading) {
    content = <div className="loading">Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div className="text-red-400 font-bold m-2">{error}</div>;
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <div className="error">Transaction Not Found.</div>;
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }
  return (
    <>
      <p className="second_heading">Your Transactions:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};
export default Transactions;
