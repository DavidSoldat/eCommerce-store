import cartItem0 from "../assets/items/cartItem0.png";
import { CartDto } from "./DTO";
import { CartItemModel } from "./types";

export function calculateDiscount(price: number, discountPercentage: number) {
  const discountAmount = (price * discountPercentage) / 100;
  return Math.round((price - discountAmount) * 100) / 100;
}

export function formatNumber(num: number) {
  return num.toLocaleString();
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function groupBrandsByLetter(brands: { id: number; name: string }[]) {
  return brands.reduce<Record<string, { id: number; name: string }[]>>(
    (acc, brand) => {
      const firstLetter = brand.name[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(brand);
      return acc;
    },
    {},
  );
}

function convertCartDtoToCartItemModel(cartDto: CartDto): CartItemModel {
  return {
    id: cartDto.product.id,
    image: cartItem0,
    title: cartDto.product.productName,
    size: cartDto.selectedSize,
    color: cartDto.selectedColor,
    discount: cartDto.product.productDiscount,
    price: cartDto.product.productPrice,
    quantity: cartDto.quantity,
  };
}

export function convertCartDto(cartDtos: CartDto[]): CartItemModel[] {
  return cartDtos.map(convertCartDtoToCartItemModel);
}
