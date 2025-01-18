import { Link } from "react-router";
import ItemCard from "./ItemCard";

export default function ItemsSection({
  title,
  small,
}: {
  title: string;
  small?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col gap-5 py-10 md:mx-auto md:max-w-[1240px] ${small ? "py-0" : ""}`}
    >
      <h1
        className={`text-center font-[IntegralCF] text-3xl font-extrabold uppercase ${small ? "text-xl font-semibold md:text-3xl" : ""}`}
      >
        {title}
      </h1>

      <div className="flex flex-col gap-5 md:items-center">
        <div className="container mx-auto md:mx-0 md:w-full">
          <div className="scrollbar-hide flex space-x-4 overflow-x-auto md:hidden">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
          <div className="hidden justify-around md:flex md:flex-wrap">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </div>
        <Link
          to={`/shop/${title}`}
          className="w-full justify-self-center rounded-full border py-3 text-sm hover:bg-[#f0f0f0] md:w-fit md:px-10"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
