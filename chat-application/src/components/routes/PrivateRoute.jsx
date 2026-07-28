import { Navigate } from "react-router";
import Auth from "../../utilities/Auth";

const PrivateRoute = ({ children }) => {
  const { isUserLoggedIn } = Auth();
  return isUserLoggedIn ? children : <Navigate to="/" />;
};
export default PrivateRoute;
