import { Link, useMatch } from "react-router";
import Logo from "../assets/react.svg";
import Search from "./Search";
const Navbar = () => {
  const isHomePage = useMatch("/");
  return (
    <nav className="py-4 2xl:px-6">
      <div className="container flex items-center justify-between">
        <img src={Logo} width="60" className="object-contain" />

        <ul className="hidden md:flex items-center space-x-6">
          <Link
            className={`cursor-pointer ${isHomePage && "font-semibold"}`}
            to="/"
            id="lws-bookStore"
          >
            <li className="hover:underline underline-offset-1">Book Store</li>
          </Link>

          <Link
            to="/books/add"
            className={`cursor-pointer ${!isHomePage && "font-semibold"}`}
            id="lws-addBook"
          >
            <li
              className={`${isHomePage && "hover:underline"}  underline-offset-1`}
            >
              Add Book
            </li>
          </Link>
        </ul>

        {isHomePage && <Search />}
      </div>
    </nav>
  );
};
export default Navbar;
