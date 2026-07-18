import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changePostLikes,
  changePostStatus,
} from "../../features/detailPost/detailPostSlice";
const PostDetails = ({ post }) => {
  const dispatch = useDispatch();
  const { id, image, title, likes, isSaved, tags, description } = post;
  const [status, setStatus] = useState(isSaved);
  const [totalLike, setTotalLike] = useState(likes);

  useEffect(() => {
    dispatch(changePostLikes({ id, likes: totalLike }));
  }, [id, dispatch, totalLike]);

  useEffect(() => {
    dispatch(changePostStatus({ id, isSaved: status }));
  }, [dispatch, id, status]);
  return (
    <main className="post">
      <img
        src={image}
        alt="githum"
        className="w-full rounded-md"
        id="lws-megaThumb"
      />
      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {title}
        </h1>
        <div className="tags" id="lws-singleTags">
          {tags.map((tag, index) => (
            <span className="mx-2 text-green-400" key={index}>
              #{tag}
            </span>
          ))}
        </div>
        <div className="btn-group mt-2">
          <button
            className="like-btn"
            id="lws-singleLinks"
            onClick={() => setTotalLike((likes) => likes + 1)}
          >
            👍 {totalLike}
          </button>
          {status ? (
            <button
              className="active save-btn"
              id="lws-singleSavedBtn"
              onClick={() => setStatus(!status)}
            >
              🔖 Saved
            </button>
          ) : (
            <button
              className="save-btn"
              id="lws-singleSavedBtn"
              onClick={() => setStatus(!status)}
            >
              🔖 Save
            </button>
          )}
        </div>
        <div className="mt-6">
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
};
export default PostDetails;
