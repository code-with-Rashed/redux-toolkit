import { useAssignmentsQuery } from "@/features/assignments/assignmentsApi";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Assignment from "./Assignment";

const AssignmentsList = () => {
  const { data, isLoading, isError, error } = useAssignmentsQuery();
  let content;
  if (isLoading) {
    content = (
      <tr>
        <td>
          <Loading />
        </td>
      </tr>
    );
  }
  if (!isLoading && isError) {
    content = (
      <tr>
        <td>
          <Error message={error?.error} />
        </td>
      </tr>
    );
  }
  if (!isLoading && !isError && data?.length > 0) {
    content = data.map((assignment) => <Assignment assignment={assignment} key={assignment.id} />);
  }
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Title</th>
          <th className="table-th">Video Title</th>
          <th className="table-th">Mark</th>
          <th className="table-th">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};
export default AssignmentsList;
