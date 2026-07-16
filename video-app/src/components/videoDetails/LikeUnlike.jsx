import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Like from "../../assets/like.svg";
import Unlike from "../../assets/unlike.svg";
import { updateLikesUnlikesCount } from "../../features/likesUnlikes/likesUnlikesSlice";
const LikeUnlike = ({ id, likes, unlikes }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(likes);
  const [unLike, setunLike] = useState(unlikes);
  const handleLikes = () => {
    setLike(like + 1);
  };
  const handleUnlikes = () => {
    setunLike(unLike + 1);
  };
  useEffect(() => {
    dispatch(updateLikesUnlikesCount({ id: id, likes: like, unlikes: unLike }));
  }, [dispatch, id, like, unLike]);
  return (
    <div className="flex gap-10 w-48">
      <div className="flex gap-1">
        <div className="shrink-0 cursor-pointer" onClick={handleLikes}>
          <img className="w-5 block" src={Like} alt="Like" />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">{like}</div>
      </div>
      <div className="flex gap-1">
        <div className="shrink-0 cursor-pointer" onClick={handleUnlikes}>
          <img className="w-5 block" src={Unlike} alt="Unlike" />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">
          {unLike}
        </div>
      </div>
    </div>
  );
};
export default LikeUnlike;
