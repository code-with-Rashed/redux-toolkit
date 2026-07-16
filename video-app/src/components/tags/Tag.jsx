import { useDispatch, useSelector } from "react-redux";
import { toggleSelectTag } from "../../features/filter/filterSlice";

const Tag = ({ tag }) => {
  const selectedTags = useSelector((state) => state.filters.tags);
  const dispatch = useDispatch();
  const { title } = tag;
  const handleSelect = () => {
    dispatch(toggleSelectTag(title));
  };
  const isSelected = selectedTags.includes(title);
  return (
    <>
      <div
        className={`px-4 py-1 rounded-full cursor-pointer ${isSelected ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}
        onClick={handleSelect}
      >
        {title}
      </div>
    </>
  );
};
export default Tag;
