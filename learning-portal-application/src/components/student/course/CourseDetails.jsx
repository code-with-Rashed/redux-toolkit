import Description from "./Description";
import Player from "./Player";

const CourseDetails = () => {
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <Player />
      <Description />
    </div>
  );
};

export default CourseDetails;
