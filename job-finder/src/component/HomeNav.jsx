import { useDispatch } from "react-redux";
import { searching, sortingBySalary } from "../features/filters/filterSlice";

const HomeNav = () => {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    if (e.key === "Enter" || !e.target.value) {
      dispatch(searching(e.target.value));
    }
  };
  const handleSort = (e) => {
    dispatch(sortingBySalary(e.target.value));
  };
  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
            name="search"
            onKeyUp={handleSearch}
          />
        </div>
        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          onChange={handleSort}
        >
          <option>Default</option>
          <option value="low-to-high">Salary (Low to High)</option>
          <option value="high-to-low">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
};
export default HomeNav;
