import AssignmentMark from "./AssignmentMark";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const AssignmentsMarkList = ({ loading, isError, error, data }) => {
  let content = null;
  if (loading) {
    content = (
      <tr>
        <td>
          <Loading />
        </td>
      </tr>
    );
  }
  if (!loading && isError) {
    content = (
      <tr>
        <td>
          <Error message={error?.error} />
        </td>
      </tr>
    );
  }

  if (!loading && !isError && data?.length > 0) {
    content = data.map((assignment) => (
      <AssignmentMark assignment={assignment} key={assignment.id} />
    ));
  }
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Assignment</th>
          <th className="table-th">Date</th>
          <th className="table-th">Student Name</th>
          <th className="table-th">Repo Link</th>
          <th className="table-th">Mark</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};
export default AssignmentsMarkList;
