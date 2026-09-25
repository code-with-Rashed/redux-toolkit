import Auth from "@/utilities/Auth";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const { isLoggedInUserAdmin } = Auth();
  return isLoggedInUserAdmin ? children : <Navigate to="/admin" />;
};
export default AdminPrivateRoute;
