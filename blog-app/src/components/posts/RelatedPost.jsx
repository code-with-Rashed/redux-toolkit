const RelatedPost = () => {
  return (
    <div className="card">
      <a href="post.html">
        <img src="https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/eb42d2ca714ecc04115b6733b0d22ce7" alt="" />
      </a>
      <div className="p-4">
        <a href="post.html" className="text-lg post-title lws-RelatedPostTitle">
          Top Github Alternatives
        </a>
        <div className="mb-0 tags">
          <span>#python,</span> <span>#tech,</span> <span>#git</span>
        </div>
        <p>2010-03-27</p>
      </div>
    </div>
  );
};
export default RelatedPost;
