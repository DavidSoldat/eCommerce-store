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
import { useState } from "react";

export default function Cartpage() {
  const [cartItems, setCartItems] = useState<
    | {
        image: string;
        title: string;
        size: string;
        color: string;
        discount: number;
        price: number;
        quantity: number;
      }
    | []
  >([]);
  const items = [
    {
      image: cartItem0,
      title: "Gradient Graphic T-shirt",
      size: "Large",
      color: "White",
      discount: 5,
      price: 145,
      quantity: 1,
    },
    {
      image: cartItem1,
      title: "Checkered Shirt",
      size: "Medium",
      color: "Red",
      discount: 5,
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
  const user = useSelector((state: RootState) => state.user);
  const logedOn = user?.email;

  return (
    <div className="mx-auto h-full max-w-[1240px] px-4">
      <Divider />

      {!logedOn ? (
        <div className="flex h-80 items-center justify-center">
          <Link
            to="/login"
            className="text-lg font-medium underline hover:no-underline"
          >
            Click here to sing in and view your cart.
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
                <ul>
                  {cartItems.map((item) => (
                    <li>
                      <CartItem product={item} />
                      <Divider />
                    </li>
                  ))}
                </ul>
              </section>
              <div className="flex flex-col gap-y-3 rounded-20 border p-3 md:h-fit md:w-2/5">
                <h3 className="text-xl font-bold">Order Summary</h3>
                <div className="flex justify-between">
                  <p className="text-black opacity-70">Subtotal</p>
                  <span className="text-base font-bold">$565</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-black opacity-70">Discount (-20%)</p>
                  <span className="text-base font-bold text-[#ff3333]">
                    {" "}
                    -$113
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-black opacity-70">Delivery Fee</p>
                  <span className="text-base font-bold">$15</span>
                </div>
                <Divider />
                <div className="flex justify-between">
                  <p>Total</p>
                  <span className="text-xl font-bold">$467</span>
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
