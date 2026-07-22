import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import Success from "../../ui/Success";
import RelatedVideo from "./RelatedVideo";

const RelatedVideos = ({ title }) => {
  const { data: videos, isLoading, isError } = useGetRelatedVideosQuery(title);
  let content = null;
  if (isLoading) {
    content = [...Array(3)].map((_, index) => (
      <RelatedVideoLoader key={index} />
    ));
  }
  if (!isLoading && isError) {
    content = <Error />;
  }
  if (!isLoading && !isError && videos?.length === 0) {
    content = <Success message="No Video Found" />;
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => (
      <RelatedVideo key={video.id} video={video} />
    ));
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
};
export default RelatedVideos;
