import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="main-menu menu-active"
              id="lws-alljobs-menu"
            >
              💼 <span> All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <a
                  className="sub-menu"
                  href="/jobs/internship"
                  id="lws-internship-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                  Internship
                </a>
              </li>
              <li>
                <a
                  className="sub-menu"
                  href="/jobs/fulltime"
                  id="lws-fulltime-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]"></i>
                  Full Time
                </a>
              </li>
              <li>
                <a
                  className="sub-menu"
                  href="/jobs/remote"
                  id="lws-remote-menu"
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]"></i>
                  Remote
                </a>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/job/add" className="main-menu" id="lws-addJob-menu">
              ➕ <span>Add NewJob</span>
            </Link>
            <a href="/jobs" className="main-menu" id="lws-addJob-menu"></a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
