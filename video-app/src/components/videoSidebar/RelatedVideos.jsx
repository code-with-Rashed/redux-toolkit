import { useEffect } from "react";
import RelatedVideo from "./relatedVideo";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedVideos } from "../../features/relatedVideos/relatedVideosSlice";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
const RelatedVideos = ({ id, tags }) => {
  const relatedAllVideo = useSelector((state) => state.relatedVideos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRelatedVideos({ id, tags }));
  }, [dispatch, id, tags]);

  const { isLoading, isError, error, videos } = relatedAllVideo;
  let content = null;
  if (isLoading) content = <Loading>Loading...</Loading>;
  if (!isLoading && isError) content = <Error>{error}</Error>;
  if (!isLoading && !isError && videos?.length === 0)
    content = <div className="col-span-12">No Video Found</div>;
  if (!isLoading && !isError && videos?.length > 0)
    content = videos.map((video) => (
      <RelatedVideo key={video.id} video={video} />
    ));
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
};
export default RelatedVideos;
