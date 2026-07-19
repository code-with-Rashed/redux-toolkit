import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import amountFormat from "../../utilities/amountFormat";
const Transaction = ({ transaction }) => {
  const { name, type, amount } = transaction;
  return (
    <>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {amountFormat(amount)}</p>
          <button className="link">
            <img className="icon" src={Edit} />
          </button>
          <button className="link">
            <img className="icon" src={Delete} />
          </button>
        </div>
      </li>
    </>
  );
};
export default Transaction;
