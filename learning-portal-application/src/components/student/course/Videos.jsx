import { useVideosQuery } from "@/features/videos/videosApi";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Video from "./Video";

const Videos = () => {
  const { data, isLoading, isError, error } = useVideosQuery();
  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  }
  if (!isLoading && !isError && data?.length > 0) {
    content = data.map((video) => <Video key={video.id} video={video} />);
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};
export default Videos;
