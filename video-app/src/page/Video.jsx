import Description from "../components/videoDetails/Descreption";
import Player from "../components/videoDetails/Player";
import RelatedVideos from "../components/videoSidebar/relatedVideos";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideo } from "../features/video/videoSlice";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const Video = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (videoId) {
      dispatch(getVideo(videoId));
    }
  }, [dispatch, videoId]);

  const { isLoading, isError, error, video } = useSelector(
    (state) => state.video,
  );

  const { id, link, title, description, date, tags, likes, unlikes } =
    video || {};

  let content = null;
  if (isLoading) content = <Loading>Loading...</Loading>;
  if (!isLoading && isError) content = <Error>{error}</Error>;
  if (!isLoading && !isError && !video?.id)
    content = <div className="col-span-12">No Video Found</div>;
  if (!isLoading && !isError && video?.id)
    content = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          <Player link={link} title={title} />
          <Description
            title={title}
            description={description}
            date={date}
            likes={likes}
            unlikes={unlikes}
          />
        </div>
        <RelatedVideos id={id} tags={tags} />
      </div>
    );
  return (
    <section className="pt-6 pb-20">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        {content}
      </div>
    </section>
  );
};

export default Video;
