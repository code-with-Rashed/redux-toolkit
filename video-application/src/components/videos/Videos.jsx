import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Success from "../ui/Success";
import Video from "./Video";

const Videos = () => {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  let content = null;
  if (isLoading) {
    content = Array.from({ length: 4 }, (_, index) => index).map((loader) => (
      <VideoLoader key={loader} />
    ));
  }
  if (!isLoading && isError) {
    content = <Error message={error} />;
  }
  if (!isLoading && !isError && videos?.length === 0) {
    content = <Success message="Video Not Found." />;
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }

  return content;
};
export default Videos;
