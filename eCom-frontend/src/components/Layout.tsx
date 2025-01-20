import { Link, Outlet } from "react-router";
import Footer from "./Footer";
import Navi from "./Navi";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-black py-2 text-center text-xs font-extralight text-white">
        Sign up and get 20% off to your first order.{" "}
        <Link to="/register" className="font-normal underline hover:scale-110">
          Sign Up Now
        </Link>
      </div>
      <Navi />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
