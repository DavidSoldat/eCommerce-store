import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/userSlice";
import { loginGoogle, loginUser, registerUser } from "../../utils/auth";
import { registerSchema } from "../../utils/zodSchemas";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  type FormData = z.infer<typeof registerSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.email !== null) {
      navigate("/");
    }
  }, [navigate, user]);

  const onSubmit = async (data: FormData) => {
    const { email, password, confirmPassword } = data;

    try {
      const registerResponse = await registerUser(
        email,
        password,
        confirmPassword,
      );

      if (registerResponse) {
        toast.success("User registered successfully!");

        const userData = await loginUser(email, password);

        if (userData) {
          toast.success("Logged in successfully!");
          dispatch(setUser(userData));

          navigate("/");
        } else {
          throw new Error("Login failed after registration");
        }
      } else {
        throw new Error(registerResponse || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration or login.");
    }
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
      className="flex flex-col items-end gap-4 rounded-13 border p-5"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            autoFocus={true}
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
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            autoComplete="new-password"
            className={`rounded-13 border px-3 py-1 ${errors.confirmPassword ? "border-red-500" : ""}`}
          />
        </div>
        {errors.confirmPassword && (
          <span className="self-end text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="max-w-mx-auto w-full rounded-60 bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Register
      </button>
      <button
        className="mx-auto flex w-full items-center justify-center gap-3 rounded-60 border px-4 py-2 hover:bg-blue-50"
        type="button"
        onClick={handleGoogleLogin}
      >
        <FaGoogle />
        Continue with Google
      </button>
    </form>
  );
}
