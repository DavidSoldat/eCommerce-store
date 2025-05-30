import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { editModalStyle } from "../../utils/constants";
import { Brand, Category, Color, Size } from "../../utils/types";

import {
  editProduct,
  getBrands,
  getCategories,
  getColorsAndSizes,
} from "../../utils/api/products";
import { ProductDetailsDto } from "../../utils/DTO";
import { editProductSchema } from "../../utils/zodSchemas";
import { capitalize } from "../../utils/helpers";

export const EditProductModal = forwardRef(
  (
    {
      product,
      handleClose,
    }: {
      product: ProductDetailsDto | null;
      handleClose: () => void;
    },
    ref,
  ) => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState<Color[] | []>([]);
    const [sizes, setSizes] = useState<Size[] | []>([]);

    const fetchData = async () => {
      try {
        const [bra, cat, { colors, sizes }] = await Promise.all([
          getBrands(),
          getCategories(),
          getColorsAndSizes(),
        ]);
        setBrands(bra);
        setColors(colors);
        setSizes(sizes);
        setCategories(cat);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    type FormData = z.infer<typeof editProductSchema>;
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(editProductSchema),
      defaultValues: product as FormData,
    });

    async function onSubmit(data: FormData) {
      try {
        const response = await editProduct(data.id, data);
        if (response?.status === 200) {
          handleClose();
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <Box sx={editModalStyle} ref={ref} tabIndex={0}>
        <div className="flex w-full flex-col items-center gap-10">
          <h3 className="text-xl font-semibold">Edit product {product?.id}</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-start gap-5 rounded-13 border p-5"
          >
            {/* name */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productName">Name</label>
                <input
                  {...register("productName")}
                  type="text"
                  id="productName"
                  placeholder="Enter name"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.productName ? "border-red-500 text-sm" : ""}`}
                />
              </div>
              {errors.productName && (
                <span className="self-end text-xs text-red-500">
                  {errors.productName.message}
                </span>
              )}
            </div>
            {/* price */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productPrice">Price</label>
                <input
                  {...register("productPrice")}
                  type="number"
                  id="productPrice"
                  placeholder="Enter price"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.productPrice ? "border-red-500 text-sm" : ""}`}
                />
              </div>
              {errors.productPrice && (
                <span className="self-end text-xs text-red-500">
                  {errors.productPrice.message}
                </span>
              )}
            </div>
            {/* description */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productDescription">Description</label>
                <textarea
                  {...register("productDescription")}
                  id="productDescription"
                  placeholder="Enter description"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.productDescription ? "border-red-500 text-sm" : ""}`}
                />
              </div>
              {errors.productDescription && (
                <span className="self-end text-xs text-red-500">
                  {errors.productDescription.message}
                </span>
              )}
            </div>
            {/* discount */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productDiscount">Discount</label>
                <input
                  {...register("productDiscount")}
                  type="number"
                  id="productDiscount"
                  placeholder="Enter discount"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.productDiscount ? "border-red-500 text-sm" : ""}`}
                />
              </div>
              {errors.productDiscount && (
                <span className="self-end text-xs text-red-500">
                  {errors.productDiscount.message}
                </span>
              )}
            </div>
            {/* gender */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="genderCategory">Gender</label>
                <select
                  {...register("genderCategory")}
                  id="genderCategory"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.genderCategory ? "border-red-500 text-sm" : ""}`}
                >
                  <option value="M">Man</option>
                  <option value="W">Woman</option>
                </select>
              </div>
              {errors.genderCategory && (
                <span className="self-end text-xs text-red-500">
                  {errors.genderCategory.message}
                </span>
              )}
            </div>
            {/* brand */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="brandName">Brand</label>
                <select
                  {...register("brandName")}
                  id="brandName"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.brandName ? "border-red-500 text-sm" : ""}`}
                >
                  {brands?.map((brand: Brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.brandName && (
                <span className="self-end text-xs text-red-500">
                  {errors.brandName.message}
                </span>
              )}
            </div>
            {/* category */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="categoryName">Category</label>
                <select
                  {...register("categoryName")}
                  id="categoryName"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.categoryName ? "border-red-500 text-sm" : ""}`}
                >
                  {categories?.map((category: Category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.categoryName && (
                <span className="self-end text-xs text-red-500">
                  {errors.categoryName.message}
                </span>
              )}
            </div>
            {/* colors */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productColors">Colors</label>
                <select
                  {...register("productColors")}
                  id="productColors"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.productColors ? "border-red-500 text-sm" : ""}`}
                >
                  {colors &&
                    colors?.map((color: Color) => (
                      <option key={color.id} value={color.name}>
                        {capitalize(color.name)}
                      </option>
                    ))}
                </select>
              </div>
              {errors.productColors && (
                <span className="self-end text-xs text-red-500">
                  {errors.productColors.message}
                </span>
              )}
            </div>
            {/* sizes */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productSizes">Sizes</label>
                <select
                  {...register("productSizes")}
                  id="productSizes"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.productSizes ? "border-red-500 text-sm" : ""}`}
                >
                  {sizes &&
                    sizes?.map((size: Size) => (
                      <option key={size.id} value={size.name}>
                        {capitalize(size.name)}
                      </option>
                    ))}
                </select>
              </div>
              {errors.productSizes && (
                <span className="self-end text-xs text-red-500">
                  {errors.productSizes.message}
                </span>
              )}
            </div>

            {/* ADD FOR COLORS, IMAGES AND SIZES */}
            <button className="mx-auto mt-10 w-full rounded-60 bg-black px-4 py-2 text-white hover:bg-gray-800">
              Submit
            </button>
          </form>
        </div>
      </Box>
    );
  },
);
