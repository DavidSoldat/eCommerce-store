import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useUser } from "../../context/UserProvider";
import { loginSchema } from "../../utils/zodSchemas";
import { UserInStorage } from "../../utils/Types";

export default function Login() {
  const navigate = useNavigate();
  const userLocal = localStorage.getItem("user");
  const { setUser } = useUser();

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

  async function login(email: string, password: string) {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        },
      );

      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);

        const decodedToken = jwtDecode<{ sub?: string }>(
          response.data.accessToken,
        );
        const email = decodedToken.sub || "velura@user.com";
        const name = email.split("@")[0] || "Velura user";

        const user: UserInStorage = {
          name: name,
          email: email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        console.log("Login successful!");
        navigate("/");
        toast.success("Login successful!");
        return response.data;
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.accessToken || error.message);
        console.error(
          "Error during login: ",
          error.response?.data?.accessToken || error.message,
        );
      } else {
        console.error("Error during loign", error);
        toast.error("Error during loign");
      }
    }
  }

  const onSubmit = async (data: FormData) => {
    const { password, email } = data;
    await login(email, password);
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
      <button className="m ax-w- mx-auto w-full rounded-60 bg-black px-4 py-2 text-white hover:bg-gray-800">
        Login
      </button>
    </form>
  );
}
