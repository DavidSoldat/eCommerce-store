import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { editModalStyle } from "../../utils/constants";
import { Brand, Category, ProductDetailsDto } from "../../utils/Models";
import { editProduct } from "../../utils/products";
import { editProductSchema } from "../../utils/zodSchemas";

export const EditProductModal = forwardRef(
  (
    {
      product,
      brands,
      categories,
      handleClose,
      fetchData,
    }: {
      product: ProductDetailsDto | null;
      brands: Brand[] | null;
      categories: Category[] | null;
      handleClose: () => void;
      fetchData: () => void;
    },
    ref,
  ) => {
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
        const response = await editProduct(data.productId, data);
        if (response?.status === 200) {
          handleClose();
          fetchData();
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <Box sx={editModalStyle} ref={ref} tabIndex={0}>
        <div className="flex w-full flex-col items-center gap-10">
          <h3 className="text-xl font-semibold">
            Edit product {product?.productId}
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-5 rounded-13 border p-5"
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
                  {brands?.map((brand, i) => (
                    <option key={i} value={brand.name}>
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
                  {categories?.map((category) => (
                    <option value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              {errors.categoryName && (
                <span className="self-end text-xs text-red-500">
                  {errors.categoryName.message}
                </span>
              )}
            </div>
            {/*  */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="categoryName">Category</label>
                <select
                  {...register("categoryName")}
                  id="categoryName"
                  className={`flex-1 rounded-13 border px-3 py-1 ${errors.categoryName ? "border-red-500 text-sm" : ""}`}
                >
                  {categories?.map((category) => (
                    <option value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              {errors.categoryName && (
                <span className="self-end text-xs text-red-500">
                  {errors.categoryName.message}
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
