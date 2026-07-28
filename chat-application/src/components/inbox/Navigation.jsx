import { useDispatch } from "react-redux";
import Logo from "../../assets/react.svg";
import { userLoggedOut } from "../../features/auth/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
  };

  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <img className="h-10" src={Logo} />
          <ul>
            <li className="text-white cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
