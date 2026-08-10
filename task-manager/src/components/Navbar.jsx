import { Link } from "react-router";
import Logo from "@/assets/logo.svg";
import { useDispatch } from "react-redux";
import { search } from "@/features/filters/filtersSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    if (e.key === "Enter" || e.target.value == "") {
      dispatch(search(e.target.value.trim()));
    }
  };
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <span className="search-icon group-focus-within:text-blue-500">
            🔎
          </span>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            onKeyUp={handleSearch}
          />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
