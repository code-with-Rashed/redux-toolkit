import AssignmentOverview from "@/components/admin/assignment-mark/AssignmentOverview";
import AssignmentsMarkList from "@/components/admin/assignment-mark/AssignmentsMarkList";

const AssignmentsMarks = () => {
  return (
    <>
      <AssignmentOverview />
      <div className="overflow-x-auto mt-4">
        <AssignmentsMarkList />
      </div>
    </>
  );
};
export default AssignmentsMarks;
