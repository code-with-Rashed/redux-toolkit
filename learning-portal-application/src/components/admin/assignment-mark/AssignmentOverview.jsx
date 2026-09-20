const AssignmentOverview = ({ total, pending, markSent }) => {
  return (
    <ul className="assignment-status">
      <li>
        Total <span>{total ?? 0}</span>
      </li>
      <li>
        Pending <span>{pending ?? 0}</span>
      </li>
      <li>
        Mark Sent <span>{markSent ?? 0}</span>
      </li>
    </ul>
  );
};
export default AssignmentOverview;
