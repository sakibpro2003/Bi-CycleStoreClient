/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Logo from "../components/Logo";
import Loader from "../components/Loader";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [registerUser,{isLoading,isError}] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful!", {
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
      navigate("/login");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Failed to register. Please try again.";
      toast.error(errorMessage);
    }
  };

  if(isLoading){
    return (
      <div className="flex h-screen justify-center items-center content-center">
        <Loader></Loader>
      </div>
    )
  }
  if(isError){
    toast.error(isError)
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 border-2 border-yellow-400 rounded-lg shadow-lg">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-2xl font-bold text-black">
            Create an account
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              {...register("name")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300  focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Email address
            </label>
            <input
              type="email"
              {...register("email")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300  focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Phone</label>
            <input
              type="text"
              {...register("phone")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300  focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Gender</label>
            <select
              {...register("gender")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300  focus:border-yellow-400 focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Other">Other</option>
              <option value="Prefer Not to Say">Prefer Not to Say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-black shadow-md hover:bg-yellow-500"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-yellow-400 hover:text-yellow-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
