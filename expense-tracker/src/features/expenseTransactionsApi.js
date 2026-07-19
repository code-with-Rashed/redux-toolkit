export const fetchAllExpenseTransactions = async () => {
  const req = await fetch("http://localhost:9000/transactions");
  const res = await req.json();
  return res;
};
