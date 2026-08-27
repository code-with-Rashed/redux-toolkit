import { useQuizzesQuery } from "@/features/quizzes/quizzesApi";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Quiz from "./Quiz";

const QuizzesList = () => {
  const { data, isLoading, isError, error } = useQuizzesQuery();
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
    content = data.map((quiz) => <Quiz key={quiz.id} quiz={quiz} />);
  }
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Question</th>
          <th className="table-th">Video</th>
          <th className="table-th justify-center">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};
export default QuizzesList;
