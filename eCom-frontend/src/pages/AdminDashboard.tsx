import { useNavigate } from "react-router";
import { isUserAdmin } from "../utils/helpers";
import { useEffect } from "react";
import { Divider } from "@mui/material";

export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isAdmin = isUserAdmin(token as string);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);
  return (
    <div className="mx-auto h-full max-w-[1240px] px-4">
      <Divider />
      AdminDashboard
    </div>
  );
}
