import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMatch, useNavigate } from "react-router";
import { searchingText } from "../../features/filter/filterSlice";
const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const match = useMatch("/");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchingText(search));
    if (!match) {
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="outline-none border-none mr-2"
        type="search"
        name="search"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};
export default Search;
