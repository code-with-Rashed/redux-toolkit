import { Link } from "react-router";
const RelatedPost = ({ post }) => {
  const { id, image, title, createdAt, tags } = post;
  return (
    <div className="card">
      <Link to={`/post/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div className="p-4">
        <Link to={`/post/${id}`}>{title}</Link>
        <div className="mb-0 tags">
          {tags.map((tag, index) => (
            <span key={index} className="text-blue-300">
              #{tag}
            </span>
          ))}
        </div>
        <p>{createdAt}</p>
      </div>
    </div>
  );
};
export default RelatedPost;
