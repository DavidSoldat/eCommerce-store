import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../redux/store";

export default function Profilepage() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const role = user?.role === "ROLE_ADMIN";

  useEffect(() => {
    if (user === null || role === true) {
      navigate("/");
    }
  }, [navigate, role, user]);

  return (
    <div className="mx-auto max-w-[1240px] px-4">{role ? "admin" : "user"}</div>
  );
}
