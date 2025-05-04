import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Logo from "../components/Logo";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({});

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token);

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
    } catch (err) {
      let errorMessage = "Something went wrong!";

      if ((err as { data?: { message?: string } }).data?.message) {
        errorMessage = (err as { data: { message: string } }).data.message;
      }

      toast.error(errorMessage, { position: "top-right" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 border-2 border-yellow-400 rounded-lg shadow-lg">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-2xl font-bold text-black">Sign in to your account</h2>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email address
            </label>
            <input
              type="email"
              {...register("email")}
              required
              id="email"
              autoComplete="email"
              className="mt-2 w-full rounded-md border-2 border-yellow-400 bg-white px-3 py-2 text-black focus:outline-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-md border-2 border-yellow-400 bg-white px-3 py-2 text-black focus:outline-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-black shadow-md hover:bg-yellow-500 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full border-2 border-t-transparent border-black h-5 w-5 mr-2"></span>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-black">
          Don't have an account?{' '}
          <a href="/register" className="font-semibold text-yellow-500 hover:text-yellow-600">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
