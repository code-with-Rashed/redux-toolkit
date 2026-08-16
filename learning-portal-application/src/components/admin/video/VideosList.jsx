import { useVideosQuery } from "@/features/videos/videosApi";
import Video from "./Video";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const VideosList = () => {
  const { data, isLoading, isError, error } = useVideosQuery();
  let content;
  if (isLoading) {
    content = (
      <tr>
        <td>
          <Loading />
        </td>
      </tr>
    );
  }
  if (!isLoading && isError) {
    content = (
      <tr>
        <td>
          <Error message={error?.error} />
        </td>
      </tr>
    );
  }
  if (!isLoading && !isError) {
    if (data.length > 0) {
      content = data.map((video) => <Video key={video?.id} video={video} />);
    } else {
      content = (
        <tr>
          <td className="loading">
            No Video Found! Please Add New Video.
          </td>
        </tr>
      );
    }
  }
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Video Title</th>
          <th className="table-th">Description</th>
          <th className="table-th">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};
export default VideosList;
