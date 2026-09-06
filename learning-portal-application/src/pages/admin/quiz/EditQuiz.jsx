import { useNavigate, useParams } from "react-router-dom";
import {
  useQuizeQuery,
  useUpdateQizMutation,
} from "@/features/quizzes/quizzesApi";
import { useVideosQuery } from "@/features/videos/videosApi";
import { useEffect, useState } from "react";
const initialQuizForm = {
  question: "",
  video_id: "",
  video_title: "",
  options: [],
};
const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizForm, setQuizForm] = useState(initialQuizForm);

  const [updateQuiz, { isLoading: isQuizUpdating, isSuccess: isQuizUpdated }] =
    useUpdateQizMutation();
  const { data: videos, isSuccess: isVideosExist } = useVideosQuery();
  const {
    data,
    isSuccess: isQuizFound,
    isError: isQuizNotFound,
  } = useQuizeQuery(id);

  useEffect(() => {
    if (isQuizFound) {
      setQuizForm(data);
    }
    if (isQuizNotFound) {
      navigate("/admin/quizzes");
    }
  }, [isQuizFound, isQuizNotFound, data, navigate]);

  const addNewQuestionOptions = () => {
    const nextId = quizForm.options.at(-1).id + 1;
    setQuizForm((prev) => {
      return {
        ...prev,
        options: [
          ...prev.options,
          { id: nextId, option: "", isCorrect: false },
        ],
      };
    });
  };

  const removeQuestionsOption = (id) => {
    const updatedQuestionsOptions = quizForm.options.filter(
      (option) => option.id !== id,
    );
    setQuizForm((prev) => {
      return {
        ...prev,
        options: [...updatedQuestionsOptions],
      };
    });
  };

  const handleOptionInput = (id, field, value) => {
    setQuizForm((prev) => {
      return {
        ...prev,
        options: prev.options.map((option) => {
          if (option.id === id) {
            return {
              ...option,
              [field]: value,
            };
          }
          return option;
        }),
      };
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    let videoTitle = quizForm.video_title;
    if (name === "video_id") {
      const selectedVideo = videos.find((video) => video.id == value);
      videoTitle = selectedVideo.title;
    }
    setQuizForm((prev) => {
      return {
        ...prev,
        [name]: value,
        video_title: videoTitle,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateQuiz(quizForm);
  };

  useEffect(() => {
    if (isQuizUpdated) {
      navigate("/admin/quizzes");
    }
  }, [isQuizUpdated, navigate]);

  return (
    <div className="mx-auto max-w-md px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Quiz
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
              value={quizForm.question}
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
              defaultValue={quizForm.video_id}
            >
              <option value={quizForm.video_id}>{quizForm.video_title}</option>
              {isVideosExist &&
                videos?.length > 0 &&
                videos
                  .filter((video) => video.id !== Number(quizForm.video_id))
                  .map((video) => (
                    <option key={video.id} value={video.id}>
                      {video.title}
                    </option>
                  ))}
            </select>
          </div>
          <div className="p-2"></div>
          {/* options start */}
          <div id="options" className="mt-4 border border-cyan p-2 rounded-md">
            {quizForm.options?.map((question, index) => (
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
                    value={question.option}
                    onChange={(e) =>
                      handleOptionInput(question.id, "option", e.target.value)
                    }
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
                      checked={question.isCorrect}
                      onChange={(e) =>
                        handleOptionInput(
                          question.id,
                          "isCorrect",
                          e.target.checked,
                        )
                      }
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
            disabled={isQuizUpdating}
          >
            {isQuizUpdating ? "Updating..." : "Update Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditQuiz;
