import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import amountFormat from "../../utilities/amountFormat";
import { useDispatch } from "react-redux";
import { removeTransaction } from "../../features/expenseTransactionsSlice";
const Transaction = ({ transaction }) => {
  const { id, name, type, amount } = transaction;
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };
  return (
    <>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {amountFormat(amount)}</p>
          <button className="link">
            <img className="icon" src={Edit} />
          </button>
          <button className="link" onClick={handleDelete}>
            <img className="icon" src={Delete} />
          </button>
        </div>
      </li>
    </>
  );
};
export default Transaction;
