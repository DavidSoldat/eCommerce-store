import { useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getUserInfo } from "../utils/auth";
import { setUser } from "../redux/userSlice";

export default function OAuthHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserInfo();
        if (!user) throw new Error("User not found");
        console.log("oauth user", user);
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        toast.success("OAuth login successful!");
      } catch (error) {
        console.error("OAuth login failed:", error);
        toast.error("OAuth login failed.");
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return null;
}
