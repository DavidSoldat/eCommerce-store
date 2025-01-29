import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { RegisterResponse } from "../utils/Types";
import { registerSchema } from "../utils/zodSchemas";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();
  type FormData = z.infer<typeof registerSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  async function registerUser(
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    try {
      const response: RegisterResponse = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          email,
          password,
          confirmPassword,
        },
      );

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        navigate("/login");
      } else {
        throw new Error(response.data || "Registration failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during registering: ",
          error.response?.data?.message || error.message,
        );
      } else {
        console.error("Error during registering", error);
      }
    }
  }

  const onSubmit = async (data: FormData) => {
    const { email, password, confirmPassword } = data;
    registerUser(email, password, confirmPassword);
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
    </form>
  );
}
