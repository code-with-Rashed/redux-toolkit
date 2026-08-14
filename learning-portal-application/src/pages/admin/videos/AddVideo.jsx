const AddVideo = () => {
  return (
    <div className="mx-auto max-w-md px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Add a New Video
        </h2>
      </div>
      <form className="mt-8 space-y-6" action="#" method="POST">
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
export default AddVideo;
