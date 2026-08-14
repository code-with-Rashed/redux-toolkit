import { Link } from "react-router-dom";
import AssignmentsList from "@/components/admin/assignment/AssignmentsList";

const Assignments = () => {
  return (
    <>
      <div className="w-full flex">
        <Link to="/admin/assignment/add">Add Assignment</Link>
      </div>
      <div className="overflow-x-auto mt-4">
        <AssignmentsList />
      </div>
    </>
  );
};
export default Assignments;
