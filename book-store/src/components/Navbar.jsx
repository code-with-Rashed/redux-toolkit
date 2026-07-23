import { Link } from "react-router";
import Logo from "../assets/react.svg";
import Search from "./Search";
const Navbar = () => {
  return (
    <nav className="py-4 2xl:px-6">
      <div className="container flex items-center justify-between">
        <img src={Logo} width="60" className="object-contain" />

        <ul className="hidden md:flex items-center space-x-6">
          <Link
            className="font-semibold cursor-pointer"
            to="/"
            id="lws-bookStore"
          >
            <li>Book Store</li>
          </Link>

          <Link to="/books/add" className="cursor-pointer" id="lws-addBook">
            <li>Add Book</li>
          </Link>
        </ul>

        <Search />
      </div>
    </nav>
  );
};
export default Navbar;
