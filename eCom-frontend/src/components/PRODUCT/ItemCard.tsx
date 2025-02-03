import { Box, Rating } from "@mui/material";
import { useState } from "react";
import item from "../../assets/items/item.png";
import { Link } from "react-router";

export default function ItemCard({
  category,
  small = false,
}: {
  category: string;
  small?: boolean;
}) {
  const [value] = useState<number | null>(4.5);

  return (
    <Link
      to={`/shop/${category}/product`}
      className={`flex w-fit ${small === true ? "max-w-40" : ""} flex-col gap-1 rounded-13 border border-transparent hover:border hover:shadow-md md:max-w-fit`}
    >
      <img src={item} alt="product" className="w-full rounded-13" />
      <div className="px-2 pb-2">
        <h3 className="mt-1 truncate text-base font-bold">
          T-shirt with Tape Details
        </h3>
        <Box
          sx={{ "& > legend": { mt: 2 } }}
          className="flex items-center gap-3"
        >
          <Rating
            name="read-only"
            precision={0.5}
            value={value}
            size="small"
            readOnly
          />
          <span className="text-xs text-black opacity-60">{value}/5</span>
        </Box>
        <p className="pb-2 text-xl font-bold">$120</p>
      </div>
    </Link>
  );
}
