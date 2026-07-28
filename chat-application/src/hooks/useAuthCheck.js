import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
  let isAuthenticateUserParsist = false;
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.accessToken && auth?.user) {
    dispatch(userLoggedIn(auth));
  }
  isAuthenticateUserParsist = true;
  return { isAuthenticateUserParsist };
};

export default useAuthCheck;
