import { Navigate } from "react-router";
import Auth from "../../utilities/Auth";

const PublicRoute = ({ children }) => {
  const { isUserLoggedIn } = Auth();
  return !isUserLoggedIn ? children : <Navigate to="/inbox" />;
};
export default PublicRoute;
