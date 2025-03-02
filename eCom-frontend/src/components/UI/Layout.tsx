import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/userSlice";
import { getUserInfo } from "../../utils/auth";
import Footer from "../HOME/Footer";
import Navi from "../HOME/Navi";

export default function Layout() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userData = await getUserInfo();
      if (userData) {
        dispatch(setUser(userData)); // Update Redux store with user data
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  return (
    <div className="mt-20 flex min-h-screen flex-col md:mt-0">
      {!user && (
        <div className="bg-black py-2 text-center text-xs font-extralight text-white">
          Sign up and get 20% off to your first order.{" "}
          <Link
            to="/register"
            className="font-normal underline hover:scale-110"
          >
            Sign Up Now
          </Link>
        </div>
      )}
      <Navi />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
