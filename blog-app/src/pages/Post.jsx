import { NavLink } from "react-router";
import PostDetails from "../components/posts/PostDetails";
import RelatedPosts from "../components/posts/RelatedPosts";

const Post = () => {
  return (
    <>
      <div className="container mt-8">
        <NavLink to="/" className="inline-block text-gray-600 home-btn">
          🏠 Go Home
        </NavLink>
      </div>
      <section className="post-page-container">
        <PostDetails></PostDetails>
        <RelatedPosts></RelatedPosts>
      </section>
    </>
  );
};
export default Post;
