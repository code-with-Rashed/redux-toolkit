import { useEffect } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../features/allPost/allPostSlice";
const Posts = () => {
  const allPost = useSelector((state) => state.allPost);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);
  const { isLoading, isError, error, posts } = allPost;
  let content = null;
  if (isLoading) {
    content = <div className="font-bold p-2 text-green-500">Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div className="font-bold p-2 text-red-500">{error}</div>;
  }
  if (!isLoading && !isError && posts?.length === 0) {
    content = (
      <div className="font-bold p-2 text-yellow-500">Blog Post No Found.</div>
    );
  }
  if (!isLoading && !isError && posts?.length > 0) {
    content = posts.map((post) => <Post key={post.id} post={post} />);
  }
  return (
    <main className="post-container" id="lws-postContainer">
      {content}
    </main>
  );
};
export default Posts;
