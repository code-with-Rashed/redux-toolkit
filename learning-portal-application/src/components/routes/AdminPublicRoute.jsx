import Auth from "@/utilities/Auth";
import { Navigate } from "react-router-dom";

const AdminPublicRoute = ({ children }) => {
  const { isLoggedInUserAdmin } = Auth();
  return !isLoggedInUserAdmin ? children : <Navigate to="/admin/dashboard" />;
};
export default AdminPublicRoute;
