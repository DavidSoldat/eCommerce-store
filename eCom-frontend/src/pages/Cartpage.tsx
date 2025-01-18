import { Divider } from "@mui/material";
import { FaArrowRightLong } from "react-icons/fa6";
import cartItem from "../assets/items/cartItem.png";
import cartItem1 from "../assets/items/cartItem1.png";
import cartItem2 from "../assets/items/cartItem2.png";
import BreadCrumbs from "../components/BreadCrumbs";
import CartItem from "../components/CartItem";
import Newsletter from "../components/Newsletter";

export default function Cartpage() {
  return (
    <div className="mx-auto h-full max-w-[1240px] px-4">
      <Divider />
      <div className="mb-10 mt-4">
        <BreadCrumbs />

        <h2 className="my-3 font-[IntegralCF] text-2xl font-bold uppercase">
          Your cart
        </h2>
        <div className="mt-2 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-y-3 rounded-20 border p-3 md:w-3/5">
            <CartItem
              image={cartItem}
              title="Gradient Graphic T-shirt"
              size="Large"
              color="White"
              price={145}
              quantity={1}
            />
            <Divider />

            <CartItem
              image={cartItem1}
              title="Checkered Shirt"
              size="Medium"
              color="Red"
              price={180}
              quantity={1}
            />
            <Divider />

            <CartItem
              image={cartItem2}
              title="Skinny Fit Jeans"
              size="Large"
              color="Blue"
              price={240}
              quantity={1}
            />
          </div>
          <div className="flex flex-col gap-y-3 rounded-20 border p-3 md:h-fit md:w-2/5">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <div className="flex justify-between">
              <p className="text-black opacity-70">Subtotal</p>
              <span className="text-base font-bold">$565</span>
            </div>
            <div className="flex justify-between">
              <p className="text-black opacity-70">Discount (-20%)</p>
              <span className="text-base font-bold text-[#ff3333]"> -$113</span>
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
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
