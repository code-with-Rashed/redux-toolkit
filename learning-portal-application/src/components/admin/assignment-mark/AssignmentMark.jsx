import { useState } from "react";
import formateDate from "@/utilities/formateDate";
import { Link } from "react-router-dom";
import { useMarkAssignmentMutation } from "@/features/assignmentmark/assignmentMarkApi";

const AssignmentMark = ({ assignment }) => {
  const { id, title, student_name, repo_link, createdAt, totalMark, mark } =
    assignment;
  const [assignMark, setAssignMark] = useState(mark);
  const [markAssignment] = useMarkAssignmentMutation();

  const handleMarkChange = (e) => {
    const markValue = e.target.value;
    if (markValue > totalMark) {
      alert("Mark cannot be greater than " + totalMark);
      return;
    }
    setAssignMark(markValue);
  };

  const submitMark = () => {
    markAssignment({ id, mark: assignMark, status: "published" });
  };

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{formateDate(createdAt)}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">
        <Link
          to={repo_link}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          View Repository
        </Link>
      </td>
      <td className="table-td input-mark">
        {mark > 0 ? (
          <p className="text-center w-full font-bold">{mark}</p>
        ) : (
          <>
            <input
              max={totalMark}
              value={assignMark}
              onChange={handleMarkChange}
            />
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              onClick={submitMark}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </>
        )}
      </td>
    </tr>
  );
};
export default AssignmentMark;
