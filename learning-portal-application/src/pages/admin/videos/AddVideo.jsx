import { useEffect, useState } from "react";
import { useAddVideoMutation } from "@/features/videos/videosApi";
import Error from "@/components/ui/Error";
import { useNavigate } from "react-router-dom";

const initialVideoForm = {
  title: "",
  description: "",
  url: "",
  views: "",
  duration: "",
  createdAt: "",
};
const AddVideo = () => {
  const navigate = useNavigate();
  const [videoForm, setVideoForm] = useState(initialVideoForm);
  const [addVideo, { isLoading, isError, error, isSuccess }] =
    useAddVideoMutation();
  const handleInput = (e) => {
    const { name, value } = e.target;
    const date = new Date();
    const createdAt = date.toISOString();
    setVideoForm((prev) => {
      return {
        ...prev,
        [name]: value,
        createdAt,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo(videoForm);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/videos");
    }
  }, [isSuccess, navigate]);
  return (
    <div className="mx-auto max-w-md px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Add a New Video
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
export default AddVideo;
