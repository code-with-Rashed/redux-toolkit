import { useState } from "react";
import TextArea from "../ui/Textarea";
import TextInput from "../ui/TextInput";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import Success from "../ui/Success";
import Error from "../ui/Error";
const initialFormData = {
  title: "",
  description: "",
  author: "",
  date: "",
  duration: "",
  views: "",
  link: "",
  thumbnail: "",
};
const Form = () => {
  const [addVideo, { isLoading, isError, isSuccess }] = useAddVideoMutation();

  const [formData, setFormData] = useState(initialFormData);
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo(formData);
    if (isSuccess) {
      setFormData(initialFormData);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video Title"
                name="title"
                value={formData.title}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                name="author"
                value={formData.author}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                name="description"
                value={formData.description}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video Link"
                name="link"
                value={formData.link}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Date"
                name="date"
                value={formData.date}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Views"
                name="views"
                value={formData.views}
                onChange={handleFormInput}
                required
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
            disabled={isLoading}
          >
            Save
          </button>
        </div>
        {isSuccess && (
          <div className="m-3">
            <Success message="Add new video successfully." />
          </div>
        )}
        {isError && <Error />}
      </div>
    </form>
  );
};
export default Form;
