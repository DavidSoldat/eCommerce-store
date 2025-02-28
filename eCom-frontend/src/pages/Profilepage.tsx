import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../redux/store";
import { Divider } from "@mui/material";

export default function Profilepage() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const role = user?.role === "ROLE_ADMIN";

  useEffect(() => {
    if (user === null || role === true) {
      navigate("/");
    }
  }, [navigate, role, user]);

  return (
    <div className="mx-auto max-w-[1240px] px-4">
      <Divider />
      <div className="my-10 flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">User Profile</h2>
        <div>
          <h4>User: {user?.username}</h4>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
}
