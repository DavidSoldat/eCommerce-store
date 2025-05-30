import { JwtPayload } from "jwt-decode";

export interface UserEntity {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
  reviews: Review[] | [];
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface ProductColors {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productCategory: string;
  productDescription: string;
  productRating: number;
  genderCategory: string;
  productDiscount: number;
  productQuantity: number;
  productSizes: ProductColors[];
  productColors: ProductColors[];
  productImages: string[];
  reviews: Review[];
}

export interface Review {
  id?: number;
  reviewAuthor: UserEntity;
  reviewText: string;
  reviewRating: number;
  product: Product;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem {
  id: number;
  cart: Cart;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  cartItems: CartItem[];
}

export interface CartItemModel {
  id: number;
  image: string;
  title: string;
  size: Size;
  color: Color;
  discount: number;
  price: number;
  quantity: number;
}

export type Color = {
  id: number;
  name: string;
};
export type Size = {
  id: number;
  name: string;
};

export enum logReg {
  "login",
  "register",
}
export type FormErrors = {
  [key: string]: string;
};

export interface RegisterResponse {
  data: string;
  status: number;
}

export interface Token {
  token: string | null;
}

export interface CustomJwtPayload extends JwtPayload {
  roles: string[];
}
export interface CountUpProps {
  target: number;
  duration?: number;
  start?: number;
}
