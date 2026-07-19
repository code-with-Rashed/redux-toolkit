import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewExpenseTransaction,
  updatedExpenseTransaction,
} from "../features/expenseTransactionsSlice";
import { editModeToggle } from "../features/editableTransactionSlice";

const initialExpenseFormInput = {
  name: "",
  type: "",
  amount: "",
};
const Form = () => {
  const editTransaction = useSelector((state) => state.editTransaction);
  const dispatch = useDispatch();
  const { editMode, transaction } = editTransaction;
  useEffect(() => {
    if (editMode) {
      setExpenseForm(transaction);
    }
  }, [editMode, transaction]);

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

  const cancelEditTransaction = () => {
    dispatch(editModeToggle(false));
    setExpenseForm(initialExpenseFormInput);
  };

  const handleUpdatedSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    dispatch(updatedExpenseTransaction(expenseForm));
    dispatch(editModeToggle(false));
    setExpenseForm(initialExpenseFormInput);
    setProcessing(false);
  };

  return (
    <form
      className="form"
      onSubmit={editMode ? handleUpdatedSubmit : handleSubmit}
    >
      <h3>Add new transaction</h3>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={expenseForm.name}
          placeholder="My Salary"
          onChange={handleExpenseInput}
          required
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
            required
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
          required
        />
      </div>

      <button className="btn" disabled={processing}>
        {editMode ? "Update Transaction" : "Add Transaction"}
      </button>
      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEditTransaction}>
          Cancel Edit
        </button>
      )}
    </form>
  );
};
export default Form;
