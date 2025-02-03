import { useEffect } from "react";
import { useNavigate } from "react-router";
import { isUserAdmin } from "../utils/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Profilepage() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = isUserAdmin(token as string);

  useEffect(() => {
    if (user === null || role === true) {
      navigate("/");
    }
  }, [navigate, role, user]);

  return (
    <div className="mx-auto max-w-[1240px] px-4">{role ? "admin" : "user"}</div>
  );
}
