import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import BreadCrumbs from "../components/UI/BreadCrumbs";
import CartItem from "../components/UI/CartItem";
import Newsletter from "../components/UI/Newsletter";
import { RootState } from "../redux/store";
import {
  clearCartItems,
  getUserCart,
  removeItemFromCart,
} from "../utils/api/cart";
import { convertCartDto } from "../utils/helpers";
import { CartItemModel } from "../utils/types";
import { RemoveFromCartDto } from "../utils/DTO";
import toast from "react-hot-toast";

export default function Cartpage() {
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [loading, setLoading] = useState(true);

  async function getCart() {
    try {
      const result = await getUserCart();
      const data = convertCartDto(result);
      setCartItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  const user = useSelector((state: RootState) => state.user);
  const logedOn = user?.email;

  const updateQuantity = (title: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = async (data: RemoveFromCartDto) => {
    await removeItemFromCart(data);
    getCart();
    toast.success("Item removed from cart");
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== data.productId),
    );
  };

  const clearCart = async () => {
    try {
      await clearCartItems();
      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + (item.price * item.discount * item.quantity) / 100,
    0,
  );

  const deliveryFee = subtotal > 0 ? 15 : 0;

  const total = subtotal - totalDiscount + deliveryFee;

  return (
    <div className="mx-auto h-full max-w-[1240px] px-4">
      <Divider />

      {!logedOn ? (
        <div className="flex h-80 items-center justify-center">
          <Link
            to="/login"
            className="text-lg font-medium underline hover:no-underline"
          >
            Click here to sign in and view your cart.
          </Link>
        </div>
      ) : (
        <div className="mb-10 mt-4">
          <BreadCrumbs />

          <h2 className="my-3 font-[IntegralCF] text-2xl font-bold uppercase">
            Your cart
          </h2>
          {cartItems.length === 0 ? (
            <article className="mt-2 flex h-96 flex-col items-center justify-center">
              <h2 className="text-lg font-medium">
                There are no items in your cart.
              </h2>
              <Link
                to="/shop"
                className="px-2 underline hover:text-blue-600 hover:no-underline"
              >
                Find what suits you the best
              </Link>
            </article>
          ) : (
            <article className="mt-2 flex flex-col gap-4 md:flex-row">
              <section className="flex flex-col gap-y-3 rounded-20 border p-3 md:w-3/5">
                <ul className="flex flex-col gap-y-3">
                  {!loading &&
                    cartItems.map((item) => (
                      <li key={item.id} className="flex flex-col gap-y-3">
                        <CartItem
                          product={item}
                          updateQuantity={updateQuantity}
                          removeItem={removeItem}
                        />
                        <Divider />
                      </li>
                    ))}
                </ul>
              </section>

              <div className="flex flex-col gap-y-3 rounded-20 border p-3 md:sticky md:top-4 md:h-fit md:w-2/5">
                <h3 className="text-xl font-bold">Order Summary</h3>
                <div className="flex justify-between">
                  <p className="text-black opacity-70">Subtotal</p>
                  <span className="text-base font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-black opacity-70">Discount</p>
                  <span className="text-base font-bold text-[#ff3333]">
                    -${totalDiscount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-black opacity-70">Delivery Fee</p>
                  <span className="text-base font-bold">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
                <Divider />
                <div className="flex justify-between">
                  <p>Total</p>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
                <button className="flex w-full items-center justify-center rounded-60 bg-black py-3 text-white hover:bg-gray-800">
                  <span className="flex items-center justify-between gap-2 text-sm">
                    Go to Checkout <FaArrowRightLong color="white" />
                  </span>
                </button>
                <button
                  className="flex w-full items-center justify-center rounded-60 border border-red-500 py-3 text-red-500 hover:bg-gray-50 hover:font-bold"
                  onClick={clearCart}
                >
                  <span className="flex items-center justify-between gap-2 text-sm">
                    Clear cart
                  </span>
                </button>
              </div>
            </article>
          )}
        </div>
      )}
      <Newsletter />
    </div>
  );
}
