import { useDispatch } from "react-redux";
import { sortBy, filterBy } from "../features/filters/filterSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleSort = (e) => {
    dispatch(sortBy(e.target.value));
  };
  const handleFilter = (e) => {
    dispatch(filterBy(e.target.value));
  };
  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>
          <select
            name="sort"
            id="lws-sort"
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
            onChange={handleSort}
          >
            <option value="" >
              Default
            </option>
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            {/* <!-- handle filter on button click --> */}
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-all"
                className="radio"
                value="all"
                onChange={handleFilter}
              />
              <label htmlFor="lws-all">All</label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-saved"
                className="radio"
                value="saved"
                onChange={handleFilter}
              />
              <label htmlFor="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
