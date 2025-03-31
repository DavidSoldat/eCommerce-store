import { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { calculateDiscount } from "../../utils/helpers";

export default function CartItem({ product }) {
  const { image, title, size, color, discount, price, quantity } = product;
  function handleDecrease() {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  }

  function handleIncrease() {
    setSelectedQuantity((prev) => prev + 1);
  }

  const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity);

  return (
    <div className="flex gap-x-4 md:justify-between">
      <div className="aspect-square h-24 w-24 overflow-hidden rounded-lg md:h-32 md:w-32">
        <img
          src={image}
          alt="item image"
          className="h-24 w-24 object-cover md:h-32 md:w-32"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between md:w-full">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">{title}</h3>
            <button>
              <RiDeleteBin5Fill size={20} color="#ff3333" />
            </button>
          </div>
          <p className="text-xs">
            Size: <span className="text-black opacity-70">{size}</span>
          </p>
          <p className="text-xs">
            Color: <span className="text-black opacity-70">{color}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-lg font-bold text-black">
            <p>${calculateDiscount(price, discount)}</p>
            <p className="line-through opacity-30">${price}</p>
            <div className="flex items-center rounded-60 bg-red-50 px-3">
              <span className="text-sm font-medium text-red-500">
                -{discount}%
              </span>
            </div>
          </div>
          <div className="rounded-60 bg-[#f0f0f0] py-1">
            <button className="px-3" onClick={handleDecrease}>
              -
            </button>
            <span className="px-3">{selectedQuantity}</span>
            <button className="px-3" onClick={handleIncrease}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
