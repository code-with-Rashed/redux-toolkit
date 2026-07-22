import { useParams } from "react-router";
import Description from "../Video/Description";
import Player from "../Video/Player";
import RelatedVideos from "../Video/related/RelatedVideos";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import Error from "../ui/Error";

const Video = () => {
  const { videoId } = useParams();
  const {
    data: video,
    isLoading,
    isError,
    isSuccess,
  } = useGetVideoQuery(videoId);

  let content = null;

  if (isLoading) {
    content = (
      <>
        <PlayerLoader />
        <DescriptionLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && isSuccess) {
    content = (
      <>
        <Player title={video?.title} link={video?.link} />
        <Description
          id={video?.id}
          title={video?.title}
          description={video?.description}
          date={video?.date}
        />
      </>
    );
  }
  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>

          {isSuccess && <RelatedVideos title={video?.title} />}
        </div>
      </div>
    </section>
  );
};
export default Video;
