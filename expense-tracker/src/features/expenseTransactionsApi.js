export const fetchAllExpenseTransactions = async () => {
  const req = await fetch("http://localhost:9000/transactions");
  const res = await req.json();
  return res;
};

export const addExpenseTransaction = async (data) => {
  const req = await fetch("http://localhost:9000/transactions", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; chrset=UTF-8",
    },
  });
  const res = await req.json();
  return res;
};

export const updateExpenseTransaction = async (data) => {
  const req = await fetch(`http://localhost:9000/transactions/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; chrset=UTF-8",
    },
  });
  const res = await req.json();
  return res;
};

export const deleteTransaction = async (id) => {
  await fetch(`http://localhost:9000/transactions/${id}`, {
    method: "DELETE",
  });
};
