const PostDetails = ({ post }) => {
  const { image, title, likes, isSaved, tags, description } = post;
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
          <button className="like-btn" id="lws-singleLinks">
            👍 {likes}
          </button>
          {isSaved ? (
            <button className="active save-btn" id="lws-singleSavedBtn">
              🔖 Saved
            </button>
          ) : (
            <button className="save-btn" id="lws-singleSavedBtn">
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
