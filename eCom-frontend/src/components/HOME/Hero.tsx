import heroImg from "../../assets/hero.png";
import vector from "../../assets/brandLogos/Vector.png";
import vectorSm from "../../assets/brandLogos/Vector-sm.png";
import calivnKlein from "../../assets/brandLogos/calvinKlein.png";
import gucci from "../../assets/brandLogos/gucci.png";
import prada from "../../assets/brandLogos/prada.png";
import zara from "../../assets/brandLogos/zara.png";
import versace from "../../assets/brandLogos/versace.png";
import { Link } from "react-router";

export default function Hero() {
  return (
    <div className="mx-auto max-w-[1240px] bg-[#F2F0F1] pt-8 md:mb-[107px] md:bg-white md:pt-0">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-5 px-4 md:my-10 md:w-3/5 md:gap-8">
          <h1 className="font-[IntegralCF] text-4xl font-extrabold uppercase leading-8 md:text-6xl">
            find clother that matches your style
          </h1>
          <p className="text-sm text-black opacity-60 md:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link
            to="/shop"
            className="w-full rounded-60 bg-black py-4 text-center text-base text-white hover:bg-opacity-80 hover:drop-shadow-sm md:w-fit md:px-12"
          >
            Shop Now
          </Link>

          <div className="container mx-auto grid grid-cols-2 gap-x-6 gap-y-6 text-center md:grid-cols-3">
            <div className="relative md:flex md:flex-col md:items-start">
              <h2 className="text-2xl font-extrabold text-black md:text-3xl">
                200+
              </h2>
              <p className="text-xs font-normal text-black opacity-60">
                International Brands
              </p>
              <div className="absolute right-0 top-0 hidden h-full border-r border-gray-300 md:block"></div>
            </div>
            <div className="relative md:flex md:flex-col md:items-start">
              <h2 className="text-2xl font-extrabold text-black md:text-3xl">
                2,000+
              </h2>
              <p className="text-xs font-normal text-black opacity-60">
                High-Quality Products
              </p>
              <div className="absolute right-0 top-0 hidden h-full border-r border-gray-300 md:block"></div>
            </div>
            <div className="col-span-2 md:col-span-1 md:flex md:flex-col md:items-start">
              <h2 className="text-2xl font-extrabold text-black md:text-3xl">
                30,000+
              </h2>
              <p className="text-xs font-normal text-black opacity-60">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:relative md:block md:w-2/5">
          <img src={vector} alt="vector" className="absolute right-1 top-16" />
          <img
            src={vectorSm}
            alt="vector"
            className="absolute bottom-1/3 left-8"
          />
        </div>
        <div className="w-full bg-cover md:hidden">
          <img
            src={heroImg}
            alt="hero image"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>

      <div className="bg-black md:absolute md:left-0 md:right-0">
        <div className="parent mx-auto max-w-[1240px] px-4 py-10 md:flex md:justify-between">
          <div className="div1 flex justify-center">
            <img src={versace} alt="Versace logo" />
          </div>
          <div className="div2 flex justify-center">
            <img src={zara} alt="Zara logo" />
          </div>
          <div className="div3 flex justify-center">
            <img src={gucci} alt="Gucci logo" />
          </div>
          <div className="div4 flex justify-center">
            <img src={prada} alt="Prada logo" />
          </div>
          <div className="div5 flex justify-center">
            <img src={calivnKlein} alt="Calivn Klein logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
