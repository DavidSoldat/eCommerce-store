import { Divider } from "@mui/material";
import BrowseBy from "../components/HOME/Categories";
import Hero from "../components/HOME/Hero";
import Newsletter from "../components/UI/Newsletter";
import Reviews from "../components/HOME/Reviews";
import ItemsSection from "../components/UI/ItemSection";

export default function Homepage() {
  return (
    <div>
      <Hero />
      <div className="px-4">
        <ItemsSection title={"new arrivals"} />
        <Divider />
        <ItemsSection title={"top selling"} />
        <BrowseBy />
        <Reviews />
        <Newsletter />
      </div>
    </div>
  );
}
