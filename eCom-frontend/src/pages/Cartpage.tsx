import { Divider } from "@mui/material";
import cartItem0 from "../assets/items/cartItem0.png";
import cartItem1 from "../assets/items/cartItem1.png";
import cartItem2 from "../assets/items/cartItem2.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import BreadCrumbs from "../components/UI/BreadCrumbs";
import CartItem from "../components/UI/CartItem";
import Newsletter from "../components/UI/Newsletter";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { CartItemModel } from "../utils/Models";

export default function Cartpage() {
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);

  useEffect(() => {
    const items: CartItemModel[] = [
      {
        image: cartItem0,
        title: "Gradient Graphic T-shirt",
        size: "Large",
        color: "White",
        discount: 15,
        price: 145,
        quantity: 1,
      },
      {
        image: cartItem1,
        title: "Checkered Shirt",
        size: "Medium",
        color: "Red",
        discount: 10,
        price: 180,
        quantity: 1,
      },
      {
        image: cartItem2,
        title: "Skinny Fit Jeans",
        size: "Large",
        color: "Blue",
        discount: 5,
        price: 240,
        quantity: 1,
      },
    ];
    setCartItems(items);
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

  const removeItem = (title: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.title !== title),
    );
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
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex flex-col gap-y-3">
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
                <button className="flex w-full items-center justify-center rounded-60 bg-black py-3 text-white">
                  <span className="flex items-center justify-between gap-2 text-sm">
                    Go to Checkout <FaArrowRightLong color="white" />
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
