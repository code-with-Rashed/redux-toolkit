import Auth from "@/utilities/Auth";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isUserLoggedIn } = Auth();
  return !isUserLoggedIn ? children : <Navigate to="/course" />;
};
export default PublicRoute;
