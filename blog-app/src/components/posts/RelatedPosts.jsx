import { useDispatch, useSelector } from "react-redux";
import RelatedPost from "./RelatedPost";
import { useEffect } from "react";
import { getRelatedPosts } from "../../features/relatedPosts/relatedPostsSlice";

const RelatedPosts = ({ id, tags }) => {
  const relatedPosts = useSelector((state) => state.relatedPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRelatedPosts({ id, tags }));
  }, [dispatch, id, tags]);
  const { isLoading, isError, error, posts } = relatedPosts;
  let content = null;
  if (isLoading) {
    content = <div className="text-green-400 font-bold">Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div className="text-red-400 font-bold">{error}</div>;
  }
  if (!isLoading && !isError && posts.length > 0) {
    content = posts.map((post) => <RelatedPost key={post.id} post={post} />);
  }
  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      <div className="space-y-4 related-post-container">{content}</div>
    </aside>
  );
};
export default RelatedPosts;
