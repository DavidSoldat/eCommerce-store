import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { z } from "zod";
import { setUser } from "../../redux/userSlice";
import { login, loginGoogle } from "../../utils/auth";
import { UserRedux } from "../../utils/Types";
import { loginSchema } from "../../utils/zodSchemas";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLocal = localStorage.getItem("user");

  useEffect(() => {
    if (userLocal) {
      navigate("/");
    }
  }, [navigate, userLocal]);

  type FormData = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    const { password, email } = data;
    const { email: userEmail, username, roles } = await login(email, password);
    const user: UserRedux = {
      username: username,
      email: userEmail,
      role: roles[0].name,
    };
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUser(user));
    navigate("/");
    toast.success("Login successful!");
  };

  const handleGoogleLogin = async () => {
    try {
      loginGoogle();
    } catch (error) {
      toast.error("Failed to initiate Google login.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-end gap-3 rounded-13 border p-5"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter email"
            autoComplete="off"
            className={`rounded-13 border px-3 py-1 ${errors.email ? "border-red-500 text-sm" : ""}`}
          />
        </div>
        {errors.email && (
          <span className="self-end text-xs text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter password"
            className={`rounded-13 border px-3 py-1 ${errors.password ? "border-red-500" : ""}`}
            autoComplete="new-password"
          />
        </div>
        {errors.password && (
          <span className="self-end text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <button className="mx-auto w-full rounded-60 bg-black px-4 py-2 text-white hover:bg-gray-800">
        Login
      </button>
      <button
        className="mx-auto w-full rounded-60 border px-4 py-2 hover:bg-blue-50"
        type="button"
        onClick={handleGoogleLogin}
      >
        Login with Google
      </button>
    </form>
  );
}
