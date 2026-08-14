import VideosList from "@/components/admin/video/VideosList";
import { Link } from "react-router-dom";

const Videos = () => {
  return (
    <>
      <div className="w-full flex">
        <Link to="/admin/video/add" className="btn ml-auto">
          Add Video
        </Link>
      </div>
      <div className="overflow-x-auto mt-4">
        <VideosList />
      </div>
    </>
  );
};
export default Videos;
