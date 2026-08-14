import Quiz from "./Quiz";
const Quizzes = () => {
  return (
    <>
      <div className="space-y-8 ">
        <Quiz />
      </div>
      <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
        Submit
      </button>
    </>
  );
};
export default Quizzes;
