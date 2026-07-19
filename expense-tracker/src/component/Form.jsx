import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewExpenseTransaction } from "../features/expenseTransactionsSlice";
const initialExpenseFormInput = {
  name: "",
  type: "",
  amount: "",
};
const Form = () => {
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [expenseForm, setExpenseForm] = useState(initialExpenseFormInput);
  const handleExpenseInput = (e) => {
    const { name, value } = e.target;
    setExpenseForm((expenses) => {
      return {
        ...expenses,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    dispatch(addNewExpenseTransaction(expenseForm));
    setExpenseForm(initialExpenseFormInput);
    setProcessing(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add new transaction</h3>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={expenseForm.name}
          placeholder="My Salary"
          onChange={handleExpenseInput}
        />
      </div>

      <div className="form-group radio">
        <label htmlFor="type">Type</label>
        <div className="radio_group">
          <input
            type="radio"
            value="income"
            name="type"
            checked={expenseForm.type === "income" && true}
            onChange={handleExpenseInput}
          />
          <label htmlFor="type">Income</label>
        </div>
        <div className="radio_group">
          <input
            type="radio"
            value="expense"
            name="type"
            placeholder="Expense"
            checked={expenseForm.type === "expense" && true}
            onChange={handleExpenseInput}
          />
          <label htmlFor="transaction_type">Expense</label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          placeholder="00"
          value={expenseForm.amount}
          name="amount"
          onChange={handleExpenseInput}
        />
      </div>

      <button className="btn" disabled={processing}>
        Add Transaction
      </button>

      <button className="btn cancel_edit">Cancel Edit</button>
    </form>
  );
};
export default Form;
