import { Link } from "react-router";

export default function NotFoundpage() {
  return (
    <div className="mx-auto my-40 flex max-w-[1240px] flex-col items-center justify-center gap-3 px-4">
      <h1 className="text-4xl font-extrabold text-red-500">404 </h1>
      <h2 className="text-3xl font-bold">Page not found</h2>
      <p className="text-center text-xl">
        Sorry, the page you're looking for does not exist.
      </p>
      <Link
        to={"/"}
        className="rounded-13 border bg-black px-5 py-3 text-white"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
