import Auth from "@/utilities/Auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isUserLoggedIn } = Auth();
  return isUserLoggedIn ? children : <Navigate to="/" />;
};
export default PrivateRoute;
