import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
