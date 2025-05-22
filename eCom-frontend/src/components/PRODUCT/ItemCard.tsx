import { Box, Rating } from "@mui/material";
import { Link } from "react-router";
import item from "../../assets/items/item.png";
import { ProductDetailsDto } from "../../utils/Models";
import { calculateDiscount } from "../../utils/helpers";

export default function ItemCard({
  category,
  small = false,
  product,
}: {
  category: string;
  small?: boolean;
  product: ProductDetailsDto;
}) {
  return (
    <Link
      to={`/shop/${category}/${product.id}`}
      className={`flex w-fit ${small === true ? "max-w-40" : ""} min-w-[190px] flex-col gap-1 rounded-13 border border-transparent hover:border hover:shadow-md md:max-w-fit`}
    >
      <img src={item} alt="product" className="w-full rounded-13" />
      <div className="px-2 pb-2">
        <h3 className="mt-1 truncate text-base font-bold">
          {product.productName}
        </h3>
        <Box
          sx={{ "& > legend": { mt: 2 } }}
          className="flex items-center gap-3"
        >
          <Rating
            name="read-only"
            precision={0.5}
            value={product.productRating}
            size="small"
            readOnly
          />
          <span className="text-xs text-black opacity-60">
            {product.productRating}/5
          </span>
        </Box>
        <div className="flex items-center gap-3">
          <p className="pb-2 text-xl font-bold">
            ${calculateDiscount(product.productPrice, product.productDiscount)}
          </p>
          <p className="pb-2 text-lg font-semibold line-through opacity-50">
            ${Math.round(product.productPrice * 100) / 100}
          </p>
          <p className="mb-2 hidden rounded-13 bg-red-50 px-1 text-lg font-extrabold text-red-400 md:block">
            -{product.productDiscount}%
          </p>
        </div>
      </div>
    </Link>
  );
}
