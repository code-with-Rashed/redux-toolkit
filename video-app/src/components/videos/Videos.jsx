import { useEffect } from "react";
import Video from "./Video";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../features/videos/videosSlice";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
const Videos = () => {
  const allVideos = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  const { isLoading, isError, error, videos } = allVideos;
  let content;
  if (isLoading) content = <Loading>Loading...</Loading>;
  if (!isLoading && isError) content = <Error>{error}</Error>;
  if (!isLoading && !isError && videos?.length === 0)
    content = <div className="col-span-12">No Video Found</div>;
  if (!isLoading && !isError && videos?.length > 0)
    content = videos.map((video) => <Video key={video.id} video={video} />);
  return (
    <section className="pt-12">
      <section className="pt-12">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          {content}
        </div>
      </section>
    </section>
  );
};
export default Videos;
