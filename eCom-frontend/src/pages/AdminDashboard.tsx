import { useNavigate } from "react-router";
import { isUserAdmin } from "../utils/helpers";
import { useEffect } from "react";

export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isAdmin = isUserAdmin(token as string);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);
  return <div>AdminDashboard</div>;
}
