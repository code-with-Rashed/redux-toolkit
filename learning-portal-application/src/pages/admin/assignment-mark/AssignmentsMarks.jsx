import AssignmentOverview from "@/components/admin/assignment-mark/AssignmentOverview";
import AssignmentsMarkList from "@/components/admin/assignment-mark/AssignmentsMarkList";
import { useAssignmentMarksQuery } from "@/features/assignmentmark/assignmentMarkApi";
const AssignmentsMarks = () => {
  const { data, isLoading, isError, error } = useAssignmentMarksQuery();
  const total = data?.length;
  const pending = data?.filter((assignment) => assignment.status === "pending").length;
  const markSent = data?.filter((assignment) => assignment.status === "published").length;
  return (
    <>
      <AssignmentOverview total={total} pending={pending} markSent={markSent} />
      <div className="overflow-x-auto mt-4">
        <AssignmentsMarkList loading={isLoading} isError={isError} error={error} data={data} />
      </div>
    </>
  );
};
export default AssignmentsMarks;
