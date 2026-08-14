import Video from "./Video";

const VideosList = () => {
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Video Title</th>
          <th className="table-th">Description</th>
          <th className="table-th">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-600/50">
        <Video />
      </tbody>
    </table>
  );
};
export default VideosList;
