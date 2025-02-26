import { FieldValues, useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [registerUser] = useRegisterMutation();

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
    } catch (err) {
      toast.error("Registration failed. Please try again.", { position: "top-right" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Create an account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Email address</label>
                <input
                  type="email"
                  {...register("email")}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Phone</label>
                <input
                  type="text"
                  {...register("phone")}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Gender</label>
                <select
                  {...register("gender")}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Other">Other</option>
                  <option value="Prefer Not to Say">Prefer Not to Say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  {...register("password")}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
