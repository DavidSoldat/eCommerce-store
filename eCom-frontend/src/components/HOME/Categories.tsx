import FilterCard from "./FilterCard";
import casual from "../../assets/filterImages/casual.png";
import formal from "../../assets/filterImages/formal.png";
import party from "../../assets/filterImages/party.png";
import gym from "../../assets/filterImages/gym.png";

export default function Categories() {
  return (
    <div className="max-w-[1240px] rounded-20 bg-[#f0f0f0] px-6 py-7 md:mx-auto">
      <h2 className="text-center font-[IntegralCF] text-3xl font-extrabold uppercase">
        Browse by <br /> dress style
      </h2>
      <div className="mt-6 flex flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2">
        <FilterCard title="casual" image={casual} />
        <FilterCard title="formal" image={formal} />
        <FilterCard title="night out" image={party} />
        <FilterCard title="sportswear" image={gym} />
      </div>
    </div>
  );
}
