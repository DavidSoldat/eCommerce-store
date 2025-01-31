import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Login from "../components/AUTH/Login";
import Register from "../components/AUTH/Register";

export default function LoginRegister() {
  const location = useLocation();
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    const pathName = location.pathname.slice(1);
    setPath(pathName);
  }, [location.pathname]);

  return (
    <div className="mx-auto h-full max-w-[1240px] px-4">
      <Divider />
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
        <div className="text-2xl font-semibold">
          <Link
            to="/login"
            className={`${path === "login" ? "underline" : "font-medium text-gray-500"}`}
          >
            Login
          </Link>{" "}
          /{" "}
          <Link
            to="/register"
            className={`${path === "register" ? "text-2xl underline" : "font-medium text-gray-500"}`}
          >
            Register
          </Link>
        </div>
        {path === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}
