import Logo from "@/assets/react.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "@/components/ui/Error";
import { useRegisterMutation } from "@/features/auth/authApi";
const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [userRegister, setUserRegister] = useState(initialForm);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserRegister((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const registerHandler = (e) => {
    e.preventDefault();
    if (userRegister.password !== userRegister.confirmPassword) {
      setErrorMsg("Password doesn't match");
      return;
    }
    delete userRegister.confirmPassword;
    register({ ...userRegister, role: "student" });
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/course");
    }
    if (isError) {
      const { data } = error;
      setErrorMsg(data);
    }
  }, [isSuccess, isError, error, navigate]);
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={Logo} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={registerHandler}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="login-input rounded-t-md"
                placeholder="Student Name"
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input "
                placeholder="Email address"
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input"
                placeholder="Password"
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="confirm-password"
                required
                className="login-input rounded-b-md"
                placeholder="Confirm Password"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                I have already an account.
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              disabled={isLoading}
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="my-3">
          {errorMsg && <Error message={errorMsg} />}
        </div>
      </div>
    </section>
  );
};
export default Register;
