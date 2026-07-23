import { useDispatch, useSelector } from "react-redux";
import Books from "../components/Books";
import { filteringByType } from "../features/filters/filtersSlice";

const Home = () => {
  const { type } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const handleFilterType = (t) => {
    dispatch(filteringByType(t));
  };
  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Book List</h4>

          <div className="flex items-center space-x-4">
            <button
              className={`lws-filter-btn ${type === "All" && "active-filter"}`}
              onClick={() => handleFilterType("All")}
            >
              All
            </button>
            <button
              className={`lws-filter-btn ${type === "Featured" && "active-filter"}`}
              onClick={() => handleFilterType("Featured")}
            >
              Featured
            </button>
          </div>
        </div>

        <Books />
      </div>
    </main>
  );
};
export default Home;
