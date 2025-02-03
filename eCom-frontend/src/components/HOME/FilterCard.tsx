import { Link } from "react-router";

export default function FilterCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <Link
      to={`/shop/${title}`}
      className="group relative cursor-pointer rounded-20 bg-cover"
    >
      <h2 className="absolute left-6 top-4 z-10 transform text-2xl font-bold capitalize text-black transition-transform duration-300 group-hover:scale-110">
        {title}
      </h2>
      <div className="aspect-h-2 aspect-w-5">
        <img
          src={image}
          alt={title}
          className="w-full rounded-20 object-cover"
        />
      </div>
    </Link>
  );
}
