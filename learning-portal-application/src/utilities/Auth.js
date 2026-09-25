import { useSelector } from "react-redux";
const Auth = () => {
  const authUser = useSelector((state) => state.auth);
  let isUserLoggedIn = false;
  let accessToken = null;
  let user = null;
  let isLoggedInUserAdmin = false;
  if (authUser?.accessToken && authUser?.user) {
    isUserLoggedIn = true;
    accessToken = authUser.accessToken;
    user = authUser.user;
    isLoggedInUserAdmin = authUser.user.role === "admin" ? true : false;
  }
  return { isUserLoggedIn, accessToken, user, isLoggedInUserAdmin };
};
export default Auth;
