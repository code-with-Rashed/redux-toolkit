import Quizzes from "@/components/student/quiz/Quizzes";

const Quiz = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Quizzes for "Debounce Function in JavaScript - JavaScript Job
          Interview question"
        </h1>
        <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
      </div>
      <Quizzes />
    </>
  );
};
export default Quiz;
