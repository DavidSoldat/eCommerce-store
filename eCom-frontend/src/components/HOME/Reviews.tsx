import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Review from "../UI/Review";

export default function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto flex max-w-[1240px] flex-col gap-4 py-10">
      <div className="flex items-center justify-between">
        <h2 className="font-[IntegralCF] text-3xl font-extrabold uppercase">
          our happy customers
        </h2>

        <div className="flex">
          <button onClick={scrollLeft} className="rounded-md px-2 py-2">
            <FaArrowLeft size={22} />
          </button>
          <button onClick={scrollRight} className="rounded-md px-2 py-2">
            <FaArrowRight size={22} />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="scrollbar-hide hideScroll flex space-x-4 overflow-x-auto"
      >
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
}
