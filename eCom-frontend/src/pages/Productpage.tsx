import { Box, Divider, Rating } from "@mui/material";
import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BreadCrumbs from "../components/BreadCrumbs";
import ImageGallery from "../components/ImageGallery";
import ItemCard from "../components/ItemCard";
import Review from "../components/Review";
import { discount } from "../utils/helpers";
import { Product } from "../utils/Models";

export default function Productpage() {
  const product: Product = {
    productName: "one life graphic t shirt",
    productImages: [],
    productRating: 4.5,
    productPrice: 300,
    productQuantity: 1,
    productDiscount: 40,
    productDescription:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    productColors: ["#4F4631", "#314F4A", "#31344F"],
    productSizes: ["small", "medium", "large"],
  };
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

  function handleDecrease() {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  }

  function handleIncrease() {
    setSelectedQuantity((prev) => prev + 1);
  }

  const [selectedSize, setSelectedSize] = useState(product.productSizes[0]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    product.productQuantity || 1,
  );
  const [selectedColor, setSelectedColor] = useState(product.productColors[0]);

  return (
    <div className="mx-auto max-w-[1240px] px-4">
      <Divider />
      <div className="my-4">
        <BreadCrumbs />
        <div className="my-5 flex flex-col gap-5 md:gap-8">
          <div className="flex flex-col gap-5 md:max-h-[480px] md:flex-row">
            <ImageGallery />

            <div className="flex flex-col gap-4 md:w-3/5">
              <div className="flex flex-col gap-3">
                <h2 className="font-[IntegralCF] text-2xl font-bold uppercase">
                  {product.productName}
                </h2>
                <Box
                  sx={{ "& > legend": { mt: 2 } }}
                  className="flex items-center gap-3"
                >
                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={product.productRating}
                    size="medium"
                    readOnly
                  />
                  <span className="text-base text-black opacity-60">
                    {product.productRating}/5
                  </span>
                </Box>
                <div className="flex gap-3 text-2xl font-bold text-black">
                  <p>
                    ${discount(product.productPrice, product.productDiscount)}
                  </p>
                  <p className="line-through opacity-30">
                    ${product.productPrice}
                  </p>
                  <div className="flex items-center rounded-60 bg-red-50 px-3">
                    <span className="text-sm font-medium text-red-500">
                      -{product.productDiscount}%
                    </span>
                  </div>
                </div>
                <p className="text-black opacity-60">
                  {product.productDescription}
                </p>
              </div>

              <Divider />

              <div className="flex flex-col gap-3">
                <h4 className="text-black opacity-60">Choose Colors</h4>
                <div className="flex gap-x-3">
                  {product.productColors.map((color, i) => (
                    <div
                      key={i}
                      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-gray-300 ${
                        selectedColor === color[i] ? "ring-4 ring-gray-300" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color[i])}
                    >
                      {selectedColor === color[i] && (
                        <span className="font-bold text-white">&#10003;</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              <div className="flex flex-col gap-3">
                <h4 className="text-black opacity-60">Choose Size</h4>
                <div className="flex flex-wrap gap-x-3">
                  {product.productSizes.map((size, i) => (
                    <button
                      key={i}
                      className={`rounded-60 bg-[#f0f0f0] px-5 py-3 capitalize ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Divider />

              <div className="flex gap-3">
                <div className="flex items-center justify-center rounded-60 bg-[#f0f0f0] px-3 py-2 text-lg capitalize">
                  <button
                    className="px-3 text-xl font-medium md:px-5 md:text-3xl md:font-normal"
                    onClick={handleDecrease}
                  >
                    -
                  </button>
                  <p className="inline-block px-3 text-xl font-medium md:px-5 md:font-normal md:leading-9">
                    {selectedQuantity}
                  </p>
                  <button
                    className="px-3 text-xl font-medium md:px-5 md:text-3xl md:font-normal"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
                <button className="flex flex-grow items-center justify-center rounded-60 bg-black px-5 py-3 capitalize text-white">
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
          </div>

          <Divider />

          <div className="flex flex-col gap-3">
            <h4 className="text-black opacity-60">Rating & Reviews</h4>
            <div className="grid grid-rows-1 justify-center gap-5 md:grid-cols-2 md:grid-rows-2">
              <Review wide="wide" />
              <Review wide="wide" />
              <Review wide="wide" />
              <Review wide="wide" />
              <Review wide="wide" />
              <Review wide="wide" />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="font-[IntegralCF] text-3xl font-bold">
                you might also like
              </h2>
              <div className="flex lg:hidden">
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
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
              <ItemCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
