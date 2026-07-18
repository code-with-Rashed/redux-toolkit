import { NavLink, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PostDetails from "../components/posts/PostDetails";
import RelatedPosts from "../components/posts/RelatedPosts";
import { useEffect } from "react";
import { getDetailPost } from "../features/detailPost/detailPostSlice";

const Post = () => {
  const { postId } = useParams();
  const detailPost = useSelector((state) => state.detailPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailPost(postId));
  }, [dispatch, postId]);

  const { isLoading, isError, error, post } = detailPost;
  let content = null;
  if (isLoading) {
    content = <div className="text-green-400 font-bold">Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div className="text-red-400 font-bold">{error}</div>;
  }
  if (!isLoading && !isError && !post?.id) {
    content = (
      <div className="text-green-400 font-bold">Content Not Found.</div>
    );
  }
  if (!isLoading && !isError && post?.id) {
    content = (
      <>
        <PostDetails post={post}></PostDetails>
        <RelatedPosts></RelatedPosts>
      </>
    );
  }
  return (
    <>
      <div className="container mt-8">
        <NavLink to="/" className="inline-block text-gray-600 home-btn">
          🏠 Go Home
        </NavLink>
      </div>
      <section className="post-page-container">{content}</section>
    </>
  );
};
export default Post;
