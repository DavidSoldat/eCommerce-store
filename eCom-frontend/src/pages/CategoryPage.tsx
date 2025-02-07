import { Divider } from "@mui/material";

import { GiSettingsKnobs } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ItemCard from "../components/PRODUCT/ItemCard";
import BreadCrumbs from "../components/UI/BreadCrumbs";
import Newsletter from "../components/UI/Newsletter";
import { RootState } from "../redux/store";

export default function CategoryPage() {
  const { category } = useParams();
  const curUrl = new URL(window.location.href);
  const genderCategory = useSelector(
    (state: RootState) => state.genderCategory.genderCategory,
  );
  curUrl.searchParams.set("gender", genderCategory);
  history.pushState(null, "", curUrl);
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
              <button className="flex w-full justify-between p-2 text-gray-500 hover:bg-[#f0f0f0] hover:text-black">
                T-shirts{" "}
                <span>
                  <MdOutlineKeyboardArrowRight size={22} />
                </span>
              </button>
              <button className="flex w-full justify-between p-2 text-gray-500 hover:bg-[#f0f0f0] hover:text-black">
                T-shirts{" "}
                <span>
                  <MdOutlineKeyboardArrowRight size={22} />
                </span>
              </button>
              <button className="flex w-full justify-between p-2 text-gray-500 hover:bg-[#f0f0f0] hover:text-black">
                T-shirts{" "}
                <span>
                  <MdOutlineKeyboardArrowRight size={22} />
                </span>
              </button>
              <button className="flex w-full justify-between p-2 text-gray-500 hover:bg-[#f0f0f0] hover:text-black">
                T-shirts{" "}
                <span>
                  <MdOutlineKeyboardArrowRight size={22} />
                </span>
              </button>
            </div>
            <div className="px-5">
              <Divider />
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 justify-items-center sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
            <ItemCard category={category as string} small={true} />
            <ItemCard category={category as string} small={true} />
            <ItemCard category={category as string} small={true} />
            <ItemCard category={category as string} small={true} />
            <ItemCard category={category as string} small={true} />
            <ItemCard category={category as string} small={true} />
            <ItemCard category={category as string} small={true} />
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
