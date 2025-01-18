import { Divider } from "@mui/material";
import BreadCrumbs from "../components/BreadCrumbs";
import ItemsSection from "../components/ItemSection";
import Newsletter from "../components/Newsletter";

export default function Shoppage() {
  return (
    <div className="mx-auto max-w-[1240px] px-4">
      <Divider />
      <div className="my-4">
        <BreadCrumbs />
        <div className="flex flex-col gap-5 py-5">
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
