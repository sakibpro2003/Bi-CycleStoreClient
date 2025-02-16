import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Navigate, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login = () => {
  // const notify = () => toast("Login Successful");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "sakib@gmail.com",
      password: "1234",
    },
  });
  const [login, { data, error }] = useLoginMutation();

  //!my creativity..................
  // type TUserData = {
  //   email: string;
  //   password: string;
  // };
  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.token);
    console.log(user);
    console.log(res);
    dispatch(setUser({ user: user, token: res.data.token }));
    toast.success("Login successful", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigate("/");
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    {...register("email")}
                    required
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Dont have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
