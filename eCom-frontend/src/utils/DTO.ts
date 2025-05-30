import { Color, Product, ProductColors, Size } from "./types";

export interface ProductDetailsDto {
  id: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productRating: number;
  productDiscount: number;
  productQuantity: number;
  genderCategory: string;
  createdAt: string;
  brandName: string;
  categoryName: string;
  productSizes: ProductColors[];
  productColors: ProductColors[];
  images: string[];
  reviews: string[];
}

export interface EditProductDto {
  id: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productDiscount: number;
  productQuantity: number;
  genderCategory: string;
  brandName: string;
  categoryName: string;
  productSizes: ProductColors[];
  productColors: ProductColors[];
}

export interface AddToCartDto {
  id: number;
  color: number;
  size: number;
  quantity: number;
}

export interface CartDto {
  id: number;
  product: Product;
  quantity: number;
  selectedColor: Color;
  selectedSize: Size;
}

export interface RemoveFromCartDto {
  productId: number;
  sizeId: number;
  colorId: number;
}

export interface CategoryDto {
  id: number;
  name: string;
}
