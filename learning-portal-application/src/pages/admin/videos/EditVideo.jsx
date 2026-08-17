import { useNavigate, useParams } from "react-router-dom";
import Error from "@/components/ui/Error";
import {
  useUpdateVideoMutation,
  useVideoQuery,
} from "@/features/videos/videosApi";
import { useEffect, useState } from "react";
const initialVideoForm = {
  id: "",
  title: "",
  description: "",
  url: "",
  views: "",
  duration: "",
  createdAt: "",
};
const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError, isSuccess } = useVideoQuery(id);
  const [
    updateVideo,
    {
      isLoading,
      isError: isUpdateVideoError,
      error,
      isSuccess: isUpdateVideoSuccess,
    },
  ] = useUpdateVideoMutation();
  const [videoForm, setVideoForm] = useState(initialVideoForm);

  useEffect(() => {
    if (isSuccess) {
      setVideoForm(data);
    }
    if (isError) {
      navigate("/admin/videos");
    }
  }, [isSuccess, isError, data, navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setVideoForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVideo(videoForm);
  };

  useEffect(() => {
    if (isUpdateVideoSuccess) {
      navigate("/admin/videos");
    }
  }, [isUpdateVideoSuccess, navigate]);

  return (
    <div className="mx-auto max-w-md px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Video
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
              placeholder="Video Title"
              value={videoForm.title}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="url" className="sr-only">
              Url
            </label>
            <input
              id="url"
              name="url"
              type="url"
              autoComplete="url"
              required
              className="login-input rounded-t-md"
              placeholder="Video Url"
              value={videoForm.url}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="decription" className="sr-only">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              type="description"
              autoComplete="description"
              required
              className="login-input rounded-t-md"
              placeholder="Video Description"
              rows="4"
              value={videoForm.description}
              onChange={handleInput}
            ></textarea>
          </div>
          <div>
            <label htmlFor="views" className="sr-only">
              Views
            </label>
            <input
              id="views"
              name="views"
              type="views"
              autoComplete="views"
              required
              className="login-input rounded-t-md"
              placeholder="Total Views"
              value={videoForm.views}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="duration" className="sr-only">
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              type="duration"
              autoComplete="duration"
              required
              className="login-input rounded-t-md"
              placeholder="Video Duration"
              value={videoForm.duration}
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
      {isUpdateVideoError && (
        <div className="mt-3">
          <Error message={error?.error} />
        </div>
      )}
    </div>
  );
};
export default EditVideo;
