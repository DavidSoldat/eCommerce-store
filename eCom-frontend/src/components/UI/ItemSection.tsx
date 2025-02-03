import { Link } from "react-router";
import ItemCard from "../PRODUCT/ItemCard";

export default function ItemsSection({
  title,
  small,
}: {
  title: string;
  small?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col justify-center gap-5 py-10 md:mx-auto md:max-w-[1240px] ${small ? "py-0" : ""}`}
    >
      <h1
        className={`text-center font-[IntegralCF] text-3xl font-extrabold uppercase ${small ? "text-xl font-semibold md:text-3xl" : ""}`}
      >
        {title}
      </h1>

      <div className="flex flex-col gap-5 md:items-center">
        <div className="container mx-auto md:mx-0 md:w-full">
          <div className="scrollbar-hide flex space-x-4 overflow-x-auto md:hidden">
            <ItemCard category={`${title}`} />
            <ItemCard category={`${title}`} />
            <ItemCard category={`${title}`} />
            <ItemCard category={`${title}`} />
          </div>
          <div className="hidden md:flex md:flex-wrap md:justify-around md:gap-5 lg:grid-cols-5 lg:justify-items-center">
            <ItemCard category={`${title}`} />
            <ItemCard category={`${title}`} />
            <ItemCard category={`${title}`} />
            <ItemCard category={`${title}`} />
            <ItemCard category={`${title}`} />
          </div>
        </div>
        <Link
          to={`/shop/${title}`}
          className="flex w-full justify-center rounded-full border py-3 text-sm hover:bg-[#f0f0f0] hover:drop-shadow-md md:w-fit md:px-10"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
