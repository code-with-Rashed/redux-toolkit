import { useParams } from "react-router-dom";
import Description from "./Description";
import Player from "./Player";
import { useEffect, useState } from "react";
import { useVideoQuery } from "@/features/videos/videosApi";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useLastVideoQuery } from "../../../features/videos/videosApi";

const CourseDetails = () => {
  const { id } = useParams();
  const [skipRequest, setSkipRequest] = useState(true);
  const {
    data: defaultVideo,
    isLoading: isDefaultVideoLoading,
    isError: isDefaultVideoError,
    error: defaultVideoError,
  } = useLastVideoQuery();
  const { data, isLoading, isError, error } = useVideoQuery(id, {
    skip: skipRequest,
  });
  useEffect(() => {
    if (id) {
      setSkipRequest(false);
    }
  }, [id]);
  let content;
  if (isDefaultVideoLoading || isLoading) {
    content = <Loading />;
  }
  if (!isDefaultVideoLoading && isDefaultVideoError) {
    content = <Error message={defaultVideoError?.error} />;
  }
  if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  }
  if (
    !isDefaultVideoLoading &&
    !isDefaultVideoError &&
    defaultVideo.length > 0
  ) {
    const { id, url, title, description, createdAt } = defaultVideo[0];
    content = (
      <>
        <Player url={url} title={title} />
        <Description
          id={id}
          title={title}
          description={description}
          createdAt={createdAt}
        />
      </>
    );
  }
  if (!isLoading && !isError && data?.id) {
    const { id, url, title, description, createdAt } = data;
    content = (
      <>
        <Player url={url} title={title} />
        <Description
          id={id}
          title={title}
          description={description}
          createdAt={createdAt}
        />
      </>
    );
  }
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {content}
    </div>
  );
};

export default CourseDetails;
