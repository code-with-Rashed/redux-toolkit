import { useNavigate, useParams } from "react-router";
import { useEditVideoQuery } from "../../features/api/apiSlice";
import Form from "./Form";
import Error from "../ui/Error";

const EditVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { data: video, isLoading, isError } = useEditVideoQuery(videoId);
  let content = null;
  if (isLoading) {
    content = (
      <div className="text-green-500 text-center font-bold">Loading...</div>
    );
  }
  if (!isLoading && isError) {
    content = <Error />;
  }
  if (!isLoading && !isError && !video?.id) {
    navigate(`/videos/${videoId}`);
  }
  if (!isLoading && !isError && video?.id) {
    content = <Form video={video} />;
  }
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0">
      <div className="w-full">
        <div className="px-4 sm:px-0 pb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Edit video
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Please fillup the form to edit video
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">{content}</div>
      </div>
    </div>
  );
};
export default EditVideo;
