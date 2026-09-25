import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  let isAuthenticateUserParsist = false;
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.accessToken && auth?.user) {
    dispatch(userLoggedIn(auth));
  }
  isAuthenticateUserParsist = true;
  return { isAuthenticateUserParsist };
};
export default useAuthCheck;
