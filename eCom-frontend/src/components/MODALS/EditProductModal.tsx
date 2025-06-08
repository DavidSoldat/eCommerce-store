import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { editModalStyle } from "../../utils/constants";
import { Brand, Category, Color, Size } from "../../utils/types";

import {
  addProduct,
  editProduct,
  getBrands,
  getCategories,
  getColorsAndSizes,
} from "../../utils/api/products";
import { ProductDetailsDto } from "../../utils/DTO";
import { editProductSchema, productSchema } from "../../utils/zodSchemas";
import { capitalize } from "../../utils/helpers";

// export const ProductModal = forwardRef(
//   (
//     {
//       product,
//       type,
//       handleClose,
//     }: {
//       product?: ProductDetailsDto | null;
//       type: string;
//       handleClose: () => void;
//     },
//     ref,
//   ) => {
//     const [brands, setBrands] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [colors, setColors] = useState<Color[] | []>([]);
//     const [sizes, setSizes] = useState<Size[] | []>([]);

//     const fetchData = async () => {
//       try {
//         const [bra, cat, { colors, sizes }] = await Promise.all([
//           getBrands(),
//           getCategories(),
//           getColorsAndSizes(),
//         ]);
//         setBrands(bra);
//         setColors(colors);
//         setSizes(sizes);
//         setCategories(cat);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     useEffect(() => {
//       fetchData();
//     }, []);

//     type FormData = z.infer<typeof editProductSchema>;
//     const {
//       register,
//       handleSubmit,
//       formState: { errors },
//     } = useForm<FormData>({
//       resolver: zodResolver(editProductSchema),
//       defaultValues: product as FormData,
//     });

//     async function onSubmit(data: FormData) {
//       try {
//         const response = type === 'edit' ? await editProduct(data.id, data) : await addProduct(data);
//         if (response?.status === 200) {
//           handleClose();
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     return (
//       <Box sx={editModalStyle} ref={ref} tabIndex={0}>
//         <div className="flex w-full flex-col items-center gap-10">
//           <h3 className="text-xl font-semibold">Edit product {product?.id}</h3>

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex w-full flex-col items-start gap-5 rounded-13 border p-5"
//           >
//             {/* name */}
//             <div className="flex w-full flex-col">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="productName">Name</label>
//                 <input
//                   {...register("productName")}
//                   type="text"
//                   id="productName"
//                   placeholder="Enter name"
//                   autoComplete="off"
//                   className={`flex-1 rounded-13 border px-3 py-1 ${errors.productName ? "border-red-500 text-sm" : ""}`}
//                 />
//               </div>
//               {errors.productName && (
//                 <span className="self-end text-xs text-red-500">
//                   {errors.productName.message}
//                 </span>
//               )}
//             </div>
//             {/* price */}
//             <div className="flex w-full flex-col">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="productPrice">Price</label>
//                 <input
//                   {...register("productPrice")}
//                   type="number"
//                   id="productPrice"
//                   placeholder="Enter price"
//                   autoComplete="off"
//                   className={`flex-1 rounded-13 border px-3 py-1 ${errors.productPrice ? "border-red-500 text-sm" : ""}`}
//                 />
//               </div>
//               {errors.productPrice && (
//                 <span className="self-end text-xs text-red-500">
//                   {errors.productPrice.message}
//                 </span>
//               )}
//             </div>
//             {/* description */}
//             <div className="flex w-full flex-col">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="productDescription">Description</label>
//                 <textarea
//                   {...register("productDescription")}
//                   id="productDescription"
//                   placeholder="Enter description"
//                   autoComplete="off"
//                   className={`flex-1 rounded-13 border px-3 py-1 ${errors.productDescription ? "border-red-500 text-sm" : ""}`}
//                 />
//               </div>
//               {errors.productDescription && (
//                 <span className="self-end text-xs text-red-500">
//                   {errors.productDescription.message}
//                 </span>
//               )}
//             </div>
//             {/* discount */}
//             <div className="flex w-full flex-col">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="productDiscount">Discount</label>
//                 <input
//                   {...register("productDiscount")}
//                   type="number"
//                   id="productDiscount"
//                   placeholder="Enter discount"
//                   autoComplete="off"
//                   className={`flex-1 rounded-13 border px-3 py-1 ${errors.productDiscount ? "border-red-500 text-sm" : ""}`}
//                 />
//               </div>
//               {errors.productDiscount && (
//                 <span className="self-end text-xs text-red-500">
//                   {errors.productDiscount.message}
//                 </span>
//               )}
//             </div>
//             {/* gender */}
//             <div className="flex w-full flex-col">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="genderCategory">Gender</label>
//                 <select
//                   {...register("genderCategory")}
//                   id="genderCategory"
//                   className={`flex-1 rounded-13 border px-3 py-1 ${errors.genderCategory ? "border-red-500 text-sm" : ""}`}
//                 >
//                   <option value="M">Man</option>
//                   <option value="W">Woman</option>
//                 </select>
//               </div>
//               {errors.genderCategory && (
//                 <span className="self-end text-xs text-red-500">
//                   {errors.genderCategory.message}
//                 </span>
//               )}
//             </div>
//             {/* brand */}
//             <div className="flex w-full flex-col">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="brandName">Brand</label>
//                 <select
//                   {...register("brandName")}
//                   id="brandName"
//                   className={`flex-1 rounded-13 border px-3 py-1 ${errors.brandName ? "border-red-500 text-sm" : ""}`}
//                 >
//                   {brands?.map((brand: Brand) => (
//                     <option key={brand.id} value={brand.name}>
//                       {brand.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {errors.brandName && (
//                 <span className="self-end text-xs text-red-500">
//                   {errors.brandName.message}
//                 </span>
//               )}
//             </div>
//             {/* category */}
//             <div className="flex w-full flex-col">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="categoryName">Category</label>
//                 <select
//                   {...register("categoryName")}
//                   id="categoryName"
//                   className={`flex-1 rounded-13 border px-3 py-1 ${errors.categoryName ? "border-red-500 text-sm" : ""}`}
//                 >
//                   {categories?.map((category: Category) => (
//                     <option key={category.id} value={category.name}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {errors.categoryName && (
//                 <span className="self-end text-xs text-red-500">
//                   {errors.categoryName.message}
//                 </span>
//               )}
//             </div>
//             {/* colors */}
//             <div className="flex w-full flex-col">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="productColors">Colors</label>
//                 <select
//                   {...register("productColors")}
//                   id="productColors"
//                   className={`flex-1 rounded-13 border px-3 py-1 ${errors.productColors ? "border-red-500 text-sm" : ""}`}
//                 >
//                   {colors &&
//                     colors?.map((color: Color) => (
//                       <option key={color.id} value={color.name}>
//                         {capitalize(color.name)}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//               {errors.productColors && (
//                 <span className="self-end text-xs text-red-500">
//                   {errors.productColors.message}
//                 </span>
//               )}
//             </div>
//             {/* sizes */}
//             <div className="flex w-full flex-col">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="productSizes">Sizes</label>
//                 <select
//                   {...register("productSizes")}
//                   id="productSizes"
//                   className={`flex-1 rounded-13 border px-3 py-1 ${errors.productSizes ? "border-red-500 text-sm" : ""}`}
//                 >
//                   {sizes &&
//                     sizes?.map((size: Size) => (
//                       <option key={size.id} value={size.name}>
//                         {capitalize(size.name)}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//               {errors.productSizes && (
//                 <span className="self-end text-xs text-red-500">
//                   {errors.productSizes.message}
//                 </span>
//               )}
//             </div>

//             {/* ADD FOR COLORS, IMAGES AND SIZES */}
//             <button className="mx-auto mt-10 w-full rounded-60 bg-black px-4 py-2 text-white hover:bg-gray-800">
//               Submit
//             </button>
//           </form>
//         </div>
//       </Box>
//     );
//   },
// );

export const ProductModal = forwardRef(
  (
    {
      product,
      type,
      handleClose,
    }: {
      product?: ProductDetailsDto | null;
      type: "edit" | "add";
      handleClose: () => void;
    },
    ref,
  ) => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    // Create a schema for the form (without readonly fields for add mode)
    const formSchema =
      type === "add"
        ? productSchema.omit({
            id: true,
            createdAt: true,
            productRating: true,
            productQuantity: true,
            reviews: true,
          })
        : productSchema.partial({
            id: true,
            createdAt: true,
            productRating: true,
            productQuantity: true,
            reviews: true,
          });

    type FormData = z.infer<typeof formSchema>;

    const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues:
        type === "edit" && product
          ? ({
              ...product,
              // Convert arrays to single values for the form (you may need to adjust this based on your UI needs)
              productColors: product.productColors?.[0] || "",
              productSizes: product.productSizes?.[0] || "",
            } as FormData)
          : ({
              productName: "",
              productPrice: 0,
              productDescription: "",
              productDiscount: 0,
              genderCategory: "M",
              brandName: "",
              categoryName: "",
              productColors: [],
              productSizes: [],
              images: [],
            } as FormData),
    });

    // Reset form when product or type changes
    useEffect(() => {
      if (type === "edit" && product) {
        reset({
          ...product,
          // Convert arrays to single values for the form
          productColors: product.productColors?.[0] || "",
          productSizes: product.productSizes?.[0] || "",
        } as FormData);
      } else if (type === "add") {
        reset({
          productName: "",
          productPrice: 0,
          productDescription: "",
          productDiscount: 0,
          genderCategory: "M",
          brandName: brands[0]?.name || "",
          categoryName: categories[0]?.name || "",
          productColors: [],
          productSizes: [],
          images: [],
        } as FormData);
      }
    }, [type, product, reset, brands, categories, colors, sizes]);

    async function onSubmit(data: FormData) {
      setIsLoading(true);
      try {
        let response;

        // Transform form data to match API expectations
        const transformedData = {
          ...data,
          // Convert single selections back to arrays if needed
          productColors: Array.isArray(data.productColors)
            ? data.productColors
            : [data.productColors].filter(Boolean),
          productSizes: Array.isArray(data.productSizes)
            ? data.productSizes
            : [data.productSizes].filter(Boolean),
          images: data.images || [],
        };

        if (type === "edit" && product?.id) {
          response = await editProduct(product.id, transformedData);
        } else if (type === "add") {
          response = await addProduct(transformedData);
        }

        if (response?.status === 200 || response?.status === 201) {
          handleClose();
          // Optionally show success message
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Optionally show error message to user
      } finally {
        setIsLoading(false);
      }
    }

    const modalTitle =
      type === "edit" ? `Edit Product ${product?.id || ""}` : "Add New Product";

    return (
      <Box sx={editModalStyle} ref={ref} tabIndex={0}>
        <div className="flex w-full flex-col items-center gap-10">
          <h3 className="text-xl font-semibold">{modalTitle}</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-start gap-5 rounded-13 border p-5"
          >
            {/* Name */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productName" className="min-w-[100px]">
                  Name
                </label>
                <input
                  {...register("productName")}
                  type="text"
                  id="productName"
                  placeholder="Enter product name"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${
                    errors.productName ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.productName && (
                <span className="self-end text-xs text-red-500">
                  {errors.productName.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productPrice" className="min-w-[100px]">
                  Price
                </label>
                <input
                  {...register("productPrice", { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  min="0"
                  id="productPrice"
                  placeholder="Enter price"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${
                    errors.productPrice ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.productPrice && (
                <span className="self-end text-xs text-red-500">
                  {errors.productPrice.message}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="flex w-full flex-col">
              <div className="flex items-start gap-3">
                <label
                  htmlFor="productDescription"
                  className="min-w-[100px] pt-1"
                >
                  Description
                </label>
                <textarea
                  {...register("productDescription")}
                  id="productDescription"
                  placeholder="Enter product description"
                  autoComplete="off"
                  rows={3}
                  className={`resize-vertical flex-1 rounded-13 border px-3 py-1 ${
                    errors.productDescription
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {errors.productDescription && (
                <span className="self-end text-xs text-red-500">
                  {errors.productDescription.message}
                </span>
              )}
            </div>

            {/* Discount */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productDiscount" className="min-w-[100px]">
                  Discount (%)
                </label>
                <input
                  {...register("productDiscount", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  max="100"
                  id="productDiscount"
                  placeholder="Enter discount percentage"
                  autoComplete="off"
                  className={`flex-1 rounded-13 border px-3 py-1 ${
                    errors.productDiscount
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {errors.productDiscount && (
                <span className="self-end text-xs text-red-500">
                  {errors.productDiscount.message}
                </span>
              )}
            </div>

            {/* Gender */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="genderCategory" className="min-w-[100px]">
                  Gender
                </label>
                <select
                  {...register("genderCategory")}
                  id="genderCategory"
                  className={`flex-1 rounded-13 border px-3 py-1 ${
                    errors.genderCategory ? "border-red-500" : "border-gray-300"
                  }`}
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

            {/* Brand */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="brandName" className="min-w-[100px]">
                  Brand
                </label>
                <select
                  {...register("brandName")}
                  id="brandName"
                  className={`flex-1 rounded-13 border px-3 py-1 ${
                    errors.brandName ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a brand</option>
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

            {/* Category */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="categoryName" className="min-w-[100px]">
                  Category
                </label>
                <select
                  {...register("categoryName")}
                  id="categoryName"
                  className={`flex-1 rounded-13 border px-3 py-1 ${
                    errors.categoryName ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
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

            {/* Colors - Multiple Selection */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productColors" className="min-w-[100px]">
                  Colors
                </label>
                <select
                  {...register("productColors")}
                  id="productColors"
                  multiple
                  className={`h-24 flex-1 rounded-13 border px-3 py-2 ${
                    errors.productColors ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {colors?.map((color: Color) => (
                    <option key={color.id} value={color.name}>
                      {capitalize(color.name)}
                    </option>
                  ))}
                </select>
              </div>
              <small className="mt-1 text-xs text-gray-500">
                Hold Ctrl/Cmd to select multiple colors
              </small>
              {errors.productColors && (
                <span className="self-end text-xs text-red-500">
                  {errors.productColors.message}
                </span>
              )}
            </div>

            {/* Sizes - Multiple Selection */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="productSizes" className="min-w-[100px]">
                  Sizes
                </label>
                <select
                  {...register("productSizes")}
                  id="productSizes"
                  multiple
                  className={`h-24 flex-1 rounded-13 border px-3 py-2 ${
                    errors.productSizes ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {sizes?.map((size: Size) => (
                    <option key={size.id} value={size.name}>
                      {capitalize(size.name)}
                    </option>
                  ))}
                </select>
              </div>
              <small className="mt-1 text-xs text-gray-500">
                Hold Ctrl/Cmd to select multiple sizes
              </small>
              {errors.productSizes && (
                <span className="self-end text-xs text-red-500">
                  {errors.productSizes.message}
                </span>
              )}
            </div>

            {/* Images - File Upload */}
            <div className="flex w-full flex-col">
              <div className="flex items-center gap-3">
                <label htmlFor="images" className="min-w-[100px]">
                  Images
                </label>
                <input
                  {...register("images")}
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  className={`flex-1 rounded-13 border px-3 py-1 ${
                    errors.images ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <small className="mt-1 text-xs text-gray-500">
                Select multiple image files
              </small>
              {errors.images && (
                <span className="self-end text-xs text-red-500">
                  {errors.images.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mx-auto mt-10 w-full rounded-60 px-4 py-2 text-white transition-colors ${
                isLoading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {isLoading
                ? "Submitting..."
                : type === "edit"
                  ? "Update Product"
                  : "Add Product"}
            </button>
          </form>
        </div>
      </Box>
    );
  },
);
