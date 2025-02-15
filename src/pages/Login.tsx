import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input type="email" {...register("email")} required />
        <label>Password:</label>
        <input type="password" {...register("password")} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
