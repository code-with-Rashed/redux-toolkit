import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAssignmentQuery,
  useUpdateAssignmentMutation,
} from "@/features/assignments/assignmentsApi";
import { useVideosQuery } from "@/features/videos/videosApi";

const initialAssignmentForm = {
  id: "",
  title: "",
  video_id: "",
  video_title: "",
  totalMark: "",
};

const EditAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: videoData, isSuccess: isVideoFounded } = useVideosQuery();
  const {
    data: selectedAssignment,
    isSuccess: isFoundedSelectedAssignment,
    isError: isAssignmentNotFound,
  } = useAssignmentQuery(id);
  const [updateAssignment, { isSuccess: isAssignmentUpdated }] =
    useUpdateAssignmentMutation();
  const [options, setOptions] = useState(null);
  const [assignmentForm, setAssignmentForm] = useState(initialAssignmentForm);

  useEffect(() => {
    if (isFoundedSelectedAssignment) {
      setAssignmentForm(selectedAssignment);
    }
    if (isAssignmentNotFound) {
      navigate("/admin/assignments");
    }
    if (isFoundedSelectedAssignment && isVideoFounded) {
      setOptions(videoData);
    }
  }, [
    isFoundedSelectedAssignment,
    isAssignmentNotFound,
    isVideoFounded,
    selectedAssignment,
    navigate,
    videoData,
  ]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    let changedVideo;
    if (name === "video_id") {
      const video = videoData.find((video) => video.id == value);
      changedVideo = video.title;
    }
    setAssignmentForm((prev) => {
      return {
        ...prev,
        [name]: value,
        video_title: changedVideo ? changedVideo : prev.video_title,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAssignment(assignmentForm);
  };

  useEffect(() => {
    if (isAssignmentUpdated) {
      navigate("/admin/assignments");
    }
  }, [isAssignmentUpdated, navigate]);
  return (
    <div className="mx-auto max-w-md px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Assginment
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
              value={assignmentForm.title}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="video-title" className="sr-only">
              Video Title
            </label>
            {options && (
              <select
                name="video_id"
                id="video-title"
                className="login-input rounded-t-md"
                defaultValue={assignmentForm.video_id}
                onChange={handleInput}
              >
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            )}
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
              value={assignmentForm.totalMark}
              onChange={handleInput}
            />
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
export default EditAssignment;
