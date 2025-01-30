import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserProvider";
import { isUserAdmin } from "../utils/helpers";

export default function Profilepage() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [navigate, user]);

  const token = localStorage.getItem("token");
  const role = isUserAdmin(token as string);
  return (
    <div className="mx-auto max-w-[1240px] px-4">{role ? "admin" : "user"}</div>
  );
}
