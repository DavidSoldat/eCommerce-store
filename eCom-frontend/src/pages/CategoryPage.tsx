import { Divider } from "@mui/material";

import { useEffect, useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router";
import ItemCard from "../components/PRODUCT/ItemCard";
import BreadCrumbs from "../components/UI/BreadCrumbs";
import Newsletter from "../components/UI/Newsletter";
import { RootState } from "../redux/store";
import { getProducts } from "../utils/products";
import { ProductDetailsDto } from "../utils/Models";

export default function CategoryPage() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const genderCategory = useSelector(
    (state: RootState) => state.genderCategory.genderCategory,
  );
  const [products, setProducts] = useState<ProductDetailsDto[] | []>([]);

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("gender", genderCategory);
      return newParams;
    });
  }, [genderCategory, setSearchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("An error accured fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  function handleClick(itemCategory: string) {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("category", itemCategory);
      return newParams;
    });
  }

  const manCategories = [
    "T-shirts",
    "Sweaters",
    "Hoodies",
    "Jeans",
    "Trousers",
    "Jackets",
  ];
  const womanCategories = ["Skrits", "Leggings", "Dresses", ...manCategories];

  const itemCategories =
    genderCategory === "man" ? manCategories : womanCategories;

  return (
    <div className="mx-auto max-w-[1240px] px-4">
      <Divider />
      <div className="my-4">
        <BreadCrumbs />
        <div className="mt-4 flex">
          <div className="hidden w-1/5 flex-col rounded-13 border py-5 lg:flex">
            <div className="mb-5 flex h-fit w-full items-center justify-between px-5">
              <h3 className="text-xl font-semibold">Filters</h3>
              <button>
                <GiSettingsKnobs size={22} />
              </button>
            </div>
            <Divider />
            <div className="my-5 px-5">
              {itemCategories.map((category, i) => (
                <button
                  className={`flex w-full justify-between p-2 text-gray-500 ${searchParams.get("category") === category ? "bg-gray-200" : "hover:bg-[#f0f0f0] hover:text-black"}`}
                  key={i}
                  onClick={() => handleClick(category)}
                >
                  {category}
                  <span>
                    <MdOutlineKeyboardArrowRight size={22} />
                  </span>
                </button>
              ))}
            </div>
            <div className="px-5">
              <Divider />
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 justify-items-center sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
            {products.map((product: ProductDetailsDto) => (
              <ItemCard
                key={product.id}
                category={category as string}
                small={true}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
