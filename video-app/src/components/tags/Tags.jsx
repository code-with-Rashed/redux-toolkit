import { useEffect } from "react";
import Tag from "./Tag";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../../features/tags/tagsSlice";
const Tags = () => {
  const tagsData = useSelector((state) => state.tags);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);
  const { tags } = tagsData;

  if (tags?.length > 0) {
    return (
      <section>
        <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      </section>
    );
  } else {
    return <></>;
  }
};
export default Tags;
