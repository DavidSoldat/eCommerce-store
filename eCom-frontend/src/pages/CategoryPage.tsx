import { Divider } from "@mui/material";
import { useParams } from "react-router";
import BreadCrumbs from "../components/UI/BreadCrumbs";
import Newsletter from "../components/UI/Newsletter";
import ItemCard from "../components/PRODUCT/ItemCard";

export default function CategoryPage() {
  const { category } = useParams();
  return (
    <div className="mx-auto max-w-[1240px] px-4">
      <Divider />
      <div className="my-4">
        <BreadCrumbs />
        <div className="my-4 grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 md:gap-3 lg:grid-cols-5">
          <ItemCard category={category as string} small={true} />
          <ItemCard category={category as string} small={true} />
          <ItemCard category={category as string} small={true} />
          <ItemCard category={category as string} small={true} />
          <ItemCard category={category as string} small={true} />
          <ItemCard category={category as string} small={true} />
          <ItemCard category={category as string} small={true} />
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
