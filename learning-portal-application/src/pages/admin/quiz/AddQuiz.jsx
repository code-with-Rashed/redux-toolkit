import { useEffect, useState } from "react";
import { useVideosQuery } from "@/features/videos/videosApi";
import { useAddQuizMutation } from "@/features/quizzes/quizzesApi";
import { useNavigate } from "react-router-dom";
const initialQuizForm = {
  question: "",
  video_id: "",
  video_title: "",
  options: [],
};
const initialQestionOption = {
  id: 1,
  option: "",
  isCorrect: false,
};
const AddQuiz = () => {
  const { data: videos, isSuccess: isVideosExist } = useVideosQuery();
  const [addQuiz, { isLoading: isNewQuerySending, isSuccess: isNewQuizSaved }] =
    useAddQuizMutation();
  const navigate = useNavigate();
  const [quizForm, setQuizForm] = useState(initialQuizForm);
  const [questionOptions, setQuestionOptions] = useState([
    initialQestionOption,
  ]);

  let videoOptions;
  if (isVideosExist && videos?.length > 0) {
    videoOptions = videos.map((video) => (
      <option value={video.id} key={video.id}>
        {video.title}
      </option>
    ));
  }

  const addNewQuestionOptions = () => {
    const nextId = questionOptions[questionOptions.length - 1].id + 1;
    setQuestionOptions([
      ...questionOptions,
      { ...initialQestionOption, id: nextId },
    ]);
  };

  const removeQuestionsOption = (id) => {
    const updatedQuestionsOptions = questionOptions.filter(
      (option) => option.id !== id,
    );
    setQuestionOptions(updatedQuestionsOptions);
    setQuizForm((prev) => {
      return {
        ...prev,
        options: [...updatedQuestionsOptions],
      };
    });
  };

  const updateQuestionOption = (targetId, updatedFields) => {
    const options = questionOptions.map((item) => {
      if (item.id === Number(targetId)) {
        return {
          ...item,
          ...updatedFields,
        };
      }
      return item;
    });
    setQuestionOptions(options);
    return options;
  };

  const handleInput = (e) => {
    const {
      name,
      value,
      dataset: { optionId, isCorrectOptionId },
      checked,
    } = e.target;

    let video_title = quizForm.video_title;
    if (name === "video_id") {
      let selectedVideo = videos.find((video) => video.id == value);
      video_title = selectedVideo.title;
    }

    let updateQuestionOptions = questionOptions;
    if (name === "options") {
      updateQuestionOptions = updateQuestionOption(optionId, {
        option: value,
      });
    }
    if (name === "isCorrect") {
      updateQuestionOptions = updateQuestionOption(isCorrectOptionId, {
        isCorrect: checked,
      });
    }

    setQuizForm((prev) => {
      const finalQuestionForm = {
        ...prev,
        [name]: value,
        video_title,
        options: updateQuestionOptions,
      };
      delete finalQuestionForm.isCorrect;
      return finalQuestionForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuiz(quizForm);
  };

  useEffect(() => {
    if (isNewQuizSaved) {
      navigate("/admin/quizzes");
    }
  }, [isNewQuizSaved]);

  return (
    <div className="mx-auto max-w-md px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Add a New Quiz
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="my-3">
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
              onChange={handleInput}
            />
          </div>
          <div className="my-3">
            <label htmlFor="video_id" className="sr-only">
              Video Title
            </label>
            <select
              name="video_id"
              id="video_id"
              className="login-input rounded-t-md"
              required
              onChange={handleInput}
            >
              <option value="" hidden>
                Select Which Video Assignment
              </option>
              {videoOptions}
            </select>
          </div>
          <div className="p-2"></div>
          {/* options start */}
          <div id="options" className="mt-4 border border-cyan p-2 rounded-md">
            {questionOptions.map((question, index) => (
              <div
                className="my-3 border border-cyan p-2 rounded-md"
                key={question.id}
              >
                <div>
                  <label
                    htmlFor={`question-option-${question.id}`}
                    className="sr-only"
                  >
                    Question Option
                  </label>
                  <input
                    id={`question-option-${question.id}`}
                    name="options"
                    type="text"
                    autoComplete="question-option"
                    className="login-input rounded-t-md"
                    placeholder={`Question Option ${index + 1}`}
                    data-option-id={question.id}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <div>
                    <input
                      type="checkbox"
                      id={`isCorrect-${question.id}`}
                      name="isCorrect"
                      data-is-correct-option-id={question.id}
                      onChange={handleInput}
                    />
                    <label htmlFor={`isCorrect-${question.id}`}>
                      {" "}
                      Is Correct Question
                    </label>
                  </div>
                  {question.id > 1 && (
                    <button
                      type="button"
                      className="btn font-extrabold"
                      onClick={() => removeQuestionsOption(question.id)}
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              className="btn"
              type="button"
              onClick={addNewQuestionOptions}
            >
              Add More Question Option
            </button>
          </div>

          {/* options end */}
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            disabled={isNewQuerySending}
          >
            {isNewQuerySending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddQuiz;
