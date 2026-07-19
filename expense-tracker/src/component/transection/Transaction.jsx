import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
const Transaction = () => {
  return (
    <>
      <li className="transaction income">
        <p>Earned this month</p>
        <div className="right">
          <p>৳ 100</p>
          <button className="link">
            <img className="icon" src={Edit} />
          </button>
          <button className="link">
            <img className="icon" src={Delete} />
          </button>
        </div>
      </li>
      <li className="transaction expense">
        <p>Earned this month</p>
        <div className="right">
          <p>৳ 100</p>
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
