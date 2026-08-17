import { useNavigate } from "react-router-dom";
import { useAddAssignmentMutation } from "@/features/assignments/assignmentsApi";
import { useEffect, useState } from "react";
import { useVideosQuery } from "@/features/videos/videosApi";
import Error from "@/components/ui/Error";

const initialAssignmentForm = {
  title: "",
  video_id: "",
  video_title: "",
  totalMark: "",
};
const AddAssignment = () => {
  const navigate = useNavigate();
  const {
    data: videoData,
    isLoading: isVideoLoading,
    isError: isVideoError,
  } = useVideosQuery();
  const [addAssignment, { isLoading, isError, error, isSuccess }] =
    useAddAssignmentMutation();
  const [assignmentForm, setAssignmentForm] = useState(initialAssignmentForm);

  let option;
  if (!isVideoLoading && !isVideoError) {
    option = videoData.map((video) => (
      <option key={video.id} value={video.id}>
        {video.title}
      </option>
    ));
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    let video_title;
    if (name === "video_id") {
      const video = videoData.find((video) => video.id == value);
      video_title = video.title;
    }
    setAssignmentForm((prev) => {
      return {
        ...prev,
        [name]: value,
        video_title,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignment(assignmentForm);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/assignments");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="mx-auto max-w-md px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Add a New Assginment
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              autoComplete="title"
              required
              className="login-input rounded-t-md"
              placeholder="Assignment Title"
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="video-title" className="sr-only">
              Video Title
            </label>
            <select
              name="video_id"
              id="video-title"
              className="login-input rounded-t-md"
              onChange={handleInput}
              required
            >
              <option value="" hidden>
                Select Which Video Assignment
              </option>
              {option}
            </select>
          </div>
          <div>
            <label htmlFor="mark" className="sr-only">
              Mark
            </label>
            <input
              id="mark"
              name="totalMark"
              type="number"
              autoComplete="mark"
              required
              className="login-input rounded-t-md"
              placeholder="Assignment Mark"
              onChange={handleInput}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </form>
      {isError && (
        <div className="mt-3">
          <Error message={error?.error} />
        </div>
      )}
    </div>
  );
};
export default AddAssignment;
