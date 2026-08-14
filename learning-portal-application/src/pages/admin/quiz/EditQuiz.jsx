const EditQuiz = () => {
  return (
    <div className="mx-auto max-w-md px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Quiz
        </h2>
      </div>
      <form className="mt-8 space-y-6" action="#" method="POST">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="question" className="sr-only">
              Question
            </label>
            <input
              id="question"
              name="question"
              type="text"
              autoComplete="question"
              required
              className="login-input rounded-t-md"
              placeholder="Write a Question"
            />
          </div>
          <div>
            <label htmlFor="video-title" className="sr-only">
              Video Title
            </label>
            <select
              name="video-title"
              id="video-title"
              className="login-input rounded-t-md"
            >
              <option value="" hidden selected>
                Select Which Video Assignment
              </option>
              <option value="1">
                Debounce Function in JavaScript - JavaScript Job Interview
                question
              </option>
              <option value="2">
                #2 JavaScript Tips and Tricks - JavaScript Job Interview
                Questions
              </option>
            </select>
          </div>

          <div>
            <div>
              <label htmlFor="question-option" className="sr-only">
                Question Option
              </label>
              <input
                id="question-option"
                name="question-option"
                type="text"
                autoComplete="question-option"
                required
                className="login-input rounded-t-md"
                placeholder="Write a Question"
              />
            </div>
            <div className="flex justify-between space">
              <div>
                <input type="checkbox" id="is_correct" name="is_correct" />
                <label htmlFor="is_correct"> Is Correct Question</label>
              </div>
              <button className="btn">+</button>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditQuiz;
