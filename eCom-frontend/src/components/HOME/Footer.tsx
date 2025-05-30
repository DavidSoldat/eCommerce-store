import { Divider } from "@mui/material";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="bg-[#f0f0f0]">
      <div className="mx-auto mt-2 flex max-w-[1240px] flex-col gap-3 px-4 py-8">
        <h2 className="text-left font-[IntegralCF] text-3xl font-extrabold uppercase">
          Velura.co
        </h2>
        <p className="text-sm text-black opacity-60">
          We have clothes that suits your style and which you’re proud to wear.
          From women to men.
        </p>
        <div className="flex items-center justify-between">
          <div className="my-2 flex gap-4">
            <a href="https://www.facebook.com/" target="_blank">
              <BsFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <BsInstagram size={24} />
            </a>
            <a href="https://www.twitter.com/" target="_blank">
              <BsTwitter size={24} />
            </a>
          </div>
          <a
            href="https://github.com/DavidSoldat"
            className="text-sm text-black opacity-60"
          >
            David Soldat 2025
          </a>
        </div>
        <Divider />
        <p className="text-center text-sm text-black opacity-60">
          Velura.co © 2025, All Rights Reserved
        </p>
      </div>
    </div>
  );
}
