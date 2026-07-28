import { useSelector } from "react-redux";

const Auth = () => {
  let isUserLoggedIn = false;
  let accessToken = null;
  let user = null;
  const auth = useSelector((state) => state.auth);
  if (auth?.accessToken && auth?.user) {
    isUserLoggedIn = true;
    accessToken = auth.accessToken;
    user = auth.user;
  }
  return { isUserLoggedIn, accessToken, user };
};
export default Auth;
