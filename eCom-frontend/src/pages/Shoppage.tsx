import { Divider } from "@mui/material";
import ItemsSection from "../components/UI/ItemSection";
import BreadCrumbs from "../components/UI/BreadCrumbs";
import Newsletter from "../components/UI/Newsletter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setGenderCategory } from "../redux/genderSlice";

export default function Shoppage() {
  const dispatch = useDispatch();
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
        <div className="mt-10 flex w-full justify-center text-xl font-semibold drop-shadow-md">
          <div className="inline-flex w-64 overflow-hidden rounded-13 border border-[#f0f0f0]">
            <button
              className={`relative w-1/2 px-4 py-2 text-center ${genderCategory === "man" ? "bg-black text-white" : "bg-white"}`}
              onClick={() => dispatch(setGenderCategory("man"))}
            >
              Man
            </button>
            <button
              className={`w-1/2 px-4 py-2 text-center ${genderCategory === "woman" ? "bg-black text-white" : "bg-white"}`}
              onClick={() => dispatch(setGenderCategory("woman"))}
            >
              Woman
            </button>
          </div>
        </div>
        <div className="flex flex-col md:py-5">
          <ItemsSection title={"casual"} small={true} />
          <Divider />
          <ItemsSection title={"formal"} small={true} />
          <Divider />
          <ItemsSection title={"party"} small={true} />
          <Divider />
          <ItemsSection title={"gym"} small={true} />
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
