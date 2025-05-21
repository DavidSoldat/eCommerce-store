import { Box, Divider, Modal, Rating } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useParams } from "react-router";
import ImageGallery from "../components/PRODUCT/ImageGallery";
import BreadCrumbs from "../components/UI/BreadCrumbs";
import Newsletter from "../components/UI/Newsletter";
import Review from "../components/UI/Review";
import {
  imageModalStyle,
  initialReviewsToShow,
  totalReviews,
} from "../utils/constants";
import { calculateDiscount } from "../utils/helpers";
import { ProductColors, ProductDetailsDto } from "../utils/Models";
import { getProductDetails } from "../utils/products";

export default function Productpage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailsDto | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<ProductColors | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColors | null>(
    null,
  );
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [rating, setRating] = useState(4.5);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductDetails(Number(productId));
      setProduct(response);
      setSelectedColor(response.productColors[0]);
      setSelectedSize(response.productSizes[0]);
      setSelectedQuantity(1);
      setRating(response.productRating);
    };

    fetchProduct();
  }, [productId]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -207, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 207, behavior: "smooth" });
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

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const truncatedText = product?.productDescription.slice(0, 130) + "...";

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleAddToCart() {
    console.log("Add to cart: ", {
      productId,
      selectedColor,
      selectedSize,
      selectedQuantity,
    });
  }

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-4">
        <Divider />
        <div className="my-4">
          <BreadCrumbs />
          <div className="my-5 flex flex-col gap-5 md:gap-8">
            <div className="flex flex-col gap-5 md:max-h-[480px] md:flex-row">
              <ImageGallery
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleOpenModal={handleOpenModal}
              />

              <div className="flex flex-col gap-4 md:w-3/5">
                <div className="flex flex-col gap-3">
                  <h2 className="font-[IntegralCF] text-2xl font-bold uppercase">
                    {product?.productName}
                  </h2>
                  <Box
                    sx={{ "& > legend": { mt: 2 } }}
                    className="flex items-center gap-3"
                  >
                    <Rating
                      name="read-only"
                      precision={0.5}
                      value={rating}
                      size="medium"
                      readOnly
                    />
                    <span className="text-base text-black opacity-60">
                      {rating}/5
                    </span>
                  </Box>
                  <div className="flex gap-3 text-2xl font-bold text-black">
                    <p>
                      $
                      {calculateDiscount(
                        product?.productPrice as number,
                        product?.productDiscount as number,
                      )}
                    </p>
                    <p className="line-through opacity-30">
                      $
                      {Math.round((product?.productPrice as number) * 100) /
                        100}
                    </p>
                    <div className="flex items-center rounded-60 bg-red-50 px-3">
                      <span className="text-sm font-medium text-red-500">
                        -{product?.productDiscount as number}%
                      </span>
                    </div>
                  </div>
                  <p className="text-black opacity-60">
                    {product?.productDescription.slice(0, 100)}
                  </p>
                </div>

                <Divider />

                <div className="flex flex-col gap-3">
                  <h4 className="text-black opacity-60">Choose Colors</h4>
                  <div className="flex gap-x-3">
                    {product?.productColors.map((color: ProductColors) => (
                      <div
                        key={color.id}
                        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ring-1 ring-gray-300 ${
                          selectedColor === color ? "ring-4 ring-gray-300" : ""
                        }`}
                        style={{ backgroundColor: color.name }}
                        onClick={() => setSelectedColor(color)}
                      >
                        {selectedColor === color && (
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
                    {product?.productSizes.map((size: ProductColors) => (
                      <button
                        key={size.id}
                        className={`rounded-60 bg-[#f0f0f0] px-5 py-3 capitalize ${
                          selectedSize === size ? "bg-black text-white" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size.name}
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
                  <button
                    className="flex flex-grow items-center justify-center rounded-60 bg-black px-5 py-3 capitalize text-white"
                    onClick={() => handleAddToCart()}
                  >
                    <p>Add to Cart</p>
                  </button>
                </div>
              </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-3">
              <h4 className="text-black opacity-60">Product details</h4>
              <p className="hidden md:block">{product?.productDescription}</p>

              <p className="md:hidden">
                {showFullText ? product?.productDescription : truncatedText}
              </p>

              <button
                onClick={toggleShowFullText}
                className="self-start text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none md:hidden"
              >
                {showFullText ? "Show Less" : "Show More"}
              </button>
            </div>

            <Divider />

            <div className="flex flex-col gap-3">
              <h4 className="text-black opacity-60">Rating & Reviews</h4>
              <div className="grid grid-rows-1 justify-center gap-5 md:grid-cols-2 md:grid-rows-2">
                {Array.from({
                  length: showAllReviews ? totalReviews : initialReviewsToShow,
                }).map((_, index) => (
                  <Review key={index} wide="wide" />
                ))}
              </div>

              {!showAllReviews && totalReviews > initialReviewsToShow && (
                <button
                  onClick={toggleShowAllReviews}
                  className="mt-4 block w-full max-w-44 self-center rounded-lg bg-gray-200 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                >
                  Show More
                </button>
              )}
            </div>

            <div className="mt-10 flex flex-col items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-between gap-5">
                <h2 className="font-[IntegralCF] text-3xl font-bold">
                  you might also like
                </h2>
                <div className="flex lg:hidden">
                  <button onClick={scrollLeft} className="rounded-md px-2 py-2">
                    <FaArrowLeft size={22} />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="rounded-md px-2 py-2"
                  >
                    <FaArrowRight size={22} />
                  </button>
                </div>
              </div>
              <div
                ref={scrollContainerRef}
                className="scrollbar-hide hideScroll flex w-full flex-nowrap space-x-4 overflow-x-auto py-2 md:justify-center"
              >
                {/* <ItemCard category={category as string} />
                <ItemCard category={category as string} />
                <ItemCard category={category as string} />
                <ItemCard category={category as string} />
                <ItemCard category={category as string} /> */}
              </div>
            </div>
          </div>
        </div>
        <Newsletter />
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={imageModalStyle}>
          <img
            src={selectedImage as string}
            alt="full-screen image"
            className="h-full w-full object-contain"
          />
        </Box>
      </Modal>
    </>
  );
}
