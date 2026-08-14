import { Link } from "react-router-dom";
import QuizzesList from "@/components/admin/quiz/QuizzesList";

const Quizzes = () => {
  return (
    <>
      <div className="w-full flex">
        <Link to="/admin/quizzes/add">Add Quiz</Link>
      </div>
      <div className="overflow-x-auto mt-4">
        <QuizzesList />
      </div>
    </>
  );
};
export default Quizzes;
