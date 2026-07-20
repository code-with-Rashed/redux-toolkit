import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { filteringByType } from "../features/filters/filterSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleFiltering = (type) => {
    dispatch(filteringByType(type));
  };
  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="main-menu menu-active"
              id="lws-alljobs-menu"
              onClick={() => handleFiltering("")}
            >
              <i className="fa-solid fa-briefcase me-1"></i>
              <span> All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <button
                  type="button"
                  className="sub-menu"
                  id="lws-internship-menu"
                  onClick={() => handleFiltering("Internship")}
                >
                  <i className="fa-solid fa-stop !text-[#FF5757] me-1"></i>
                  Internship
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sub-menu"
                  id="lws-fulltime-menu"
                  onClick={() => handleFiltering("Full Time")}
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00] me-1"></i>Full
                  Time
                </button>
              </li>
              <li>
                <button
                  className="sub-menu"
                  type="button"
                  id="lws-remote-menu"
                  onClick={() => handleFiltering("Remote")}
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4] me-1"></i>
                  Remote
                </button>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/job/add" className="main-menu" id="lws-addJob-menu">
              <i className="fa-solid fa-file-circle-plus me-1"></i>
              <span>Add NewJob</span>
            </Link>
            <a href="/jobs" className="main-menu" id="lws-addJob-menu"></a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
