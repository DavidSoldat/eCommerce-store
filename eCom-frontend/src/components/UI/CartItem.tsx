import { RiDeleteBin5Fill } from "react-icons/ri";
import { RemoveFromCartDto } from "../../utils/DTO";
import { calculateDiscount } from "../../utils/helpers";
import { CartItemModel } from "../../utils/types";

export default function CartItem({
  product,
  updateQuantity,
  removeItem,
}: {
  product: CartItemModel;
  updateQuantity: (title: string, newQuantity: number) => void;
  removeItem: (data: RemoveFromCartDto) => Promise<void>;
}) {
  function handleDecrease() {
    if (product.quantity > 1) {
      updateQuantity(product.title, product.quantity - 1);
    }
  }

  function handleIncrease() {
    updateQuantity(product.title, product.quantity + 1);
  }

  const deleteData: RemoveFromCartDto = {
    productId: product.id,
    sizeId: product.size.id,
    colorId: product.color.id,
  };

  return (
    <div className="flex gap-x-4 md:justify-between">
      <div className="aspect-square h-24 w-24 overflow-hidden rounded-lg md:h-32 md:w-32">
        <img
          src={product.image}
          alt="item image"
          className="h-24 w-24 object-cover md:h-32 md:w-32"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between md:w-full">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">{product.title}</h3>
            <button onClick={() => removeItem(deleteData)}>
              <RiDeleteBin5Fill size={20} color="#ff3333" />
            </button>
          </div>
          <p className="text-xs">
            <span className="text-black opacity-70">{product.id}</span>
          </p>
          <p className="text-xs">
            Size:{" "}
            <span className="text-black opacity-70">{product.size?.name}</span>
          </p>
          <p className="text-xs">
            Color:{" "}
            <span className="text-black opacity-70">{product.color?.name}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-lg font-bold text-black">
            <p>${calculateDiscount(product.price, product.discount)}</p>
            <p className="line-through opacity-30">
              ${Math.round(product.price * 100) / 100}
            </p>
            <div className="flex items-center rounded-60 bg-red-50 px-3">
              <span className="text-sm font-medium text-red-500">
                -{product.discount}%
              </span>
            </div>
          </div>
          <div className="rounded-60 bg-[#f0f0f0] py-1">
            <button className="px-3" onClick={handleDecrease}>
              -
            </button>
            <span className="px-3">{product.quantity}</span>
            <button className="px-3" onClick={handleIncrease}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
